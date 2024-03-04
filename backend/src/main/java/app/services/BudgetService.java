package app.services;

import app.dto.BudgetRequestDTO;
import app.dto.BudgetResponseDTO;
import app.exceptions.ResourceIdentifierMismatchException;
import app.exceptions.ResourceNotFoundException;
import app.exceptions.ResourceOwnershipException;
import app.mappers.BudgetMapper;
import app.models.Budget;
import app.models.User;
import app.repositories.BudgetRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;

    private final BudgetMapper budgetMapper;

    // type can be either "incomes" or "expenses"
    public List<BudgetResponseDTO> getBudgetByTypeAndUserId(String type, Long id) {
        List<Budget> budgets;

        if(type.equals("incomes")) {
            budgets = budgetRepository.findByUserAndByAmountGreaterThanOrEqualTo(0, id);
        } else if (type.equals("expenses")) {
            budgets = budgetRepository.findByUserAndByAmountLessThan(0, id);
        } else if (type.equals("savings")) {
            budgets = budgetRepository.findByUserAndBySavingsTrue(id);
        } else {
            throw new IllegalArgumentException("Type must be either 'incomes' or 'expenses'");
        }

        if(budgets.isEmpty()) {
            throw new ResourceNotFoundException("No budgets found");
        }

        return budgets.stream()
                .map(budgetMapper::budgetToBudgetResponseDTO)
                .collect(Collectors.toList());
    }

    public Budget getBudgetById(Long id, User user) {
        return null;
    }

    @Transactional
    public BudgetResponseDTO createBudget(BudgetRequestDTO budget, User user) {
        Budget newBudget = Budget.builder()
                .amount(budget.getAmount())
                .isRecurring(budget.isRecurring())
                .isSavings(budget.isSavings())
                .start(budget.getStart())
                .end(budget.getEnd())
                .timeInterval(budget.getTimeInterval())
                .name(budget.getName())
                .user(user)
                .build();


        return budgetMapper.budgetToBudgetResponseDTO(budgetRepository.save(newBudget));
    }

    @Transactional
    public BudgetResponseDTO updateBudget(Long id, BudgetRequestDTO budget, User user) {
        Budget existingBudget = checkUpdateBudgetPreconditionsAndReturnExistingBudget(id, budget, user);

        existingBudget.setAmount(budget.getAmount());
        existingBudget.setRecurring(budget.isRecurring());
        existingBudget.setStart(budget.getStart());
        existingBudget.setEnd(budget.getEnd());
        existingBudget.setTimeInterval(budget.getTimeInterval());
        existingBudget.setName(budget.getName());
        existingBudget.setSavings(budget.isSavings());

        return budgetMapper.budgetToBudgetResponseDTO(budgetRepository.save(existingBudget));
    }

    private Budget checkUpdateBudgetPreconditionsAndReturnExistingBudget(Long id, BudgetRequestDTO budget, User user) {

        if(!Objects.equals(budget.getId(), id)) {
            throw new ResourceIdentifierMismatchException("Id in path does not match id in body");
        }

        Budget existingBudget = budgetRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Budget not found"));

        if(!Objects.equals(existingBudget.getUser().getId(), user.getId())) {
            throw new ResourceOwnershipException("User does not have permission to update this budget");
        }

        return existingBudget;
    }

    @Transactional
    public void deleteBudget(Long id,User user) {
        Budget existingBudget = budgetRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Budget not found"));

        if(!Objects.equals(existingBudget.getUser().getId(), user.getId())) {
            throw new ResourceOwnershipException("User does not have permission to delete this budget");
        }

        budgetRepository.deleteById(id);
    }
}
