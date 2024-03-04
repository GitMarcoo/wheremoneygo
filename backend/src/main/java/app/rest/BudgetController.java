package app.rest;

import app.dto.BudgetRequestDTO;
import app.models.Budget;
import app.models.User;
import app.services.BudgetService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/budgets")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @GetMapping("/incomes")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getBudgetIncomes(@NonNull @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(budgetService.getBudgetByTypeAndUserId(
                    "incomes", user.getId()));
    }

    @GetMapping("/expenses")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getBudgetExpenses(@NonNull @AuthenticationPrincipal User user) {
            return ResponseEntity.ok(budgetService.getBudgetByTypeAndUserId(
                    "expenses", user.getId()));
    }

    @GetMapping("/savings")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getBudgetSavings(@NonNull @AuthenticationPrincipal User user) {
            return ResponseEntity.ok(budgetService.getBudgetByTypeAndUserId(
                    "savings", user.getId()));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createBudget(@NonNull @RequestBody BudgetRequestDTO budget,
                                          @NonNull @AuthenticationPrincipal User user) {
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    budgetService.createBudget(budget, user));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateBudget(@NonNull @PathVariable Long id,
                                          @NonNull @RequestBody BudgetRequestDTO budget,
                                          @NonNull @AuthenticationPrincipal User user) {
            return ResponseEntity.ok().body(
                    budgetService.updateBudget(id, budget, user));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Budget> deleteExpense(@NonNull @PathVariable Long id,
                                                @NonNull @AuthenticationPrincipal User user) {
            budgetService.deleteBudget(id, user);
            return ResponseEntity.noContent().build();
    }


}
