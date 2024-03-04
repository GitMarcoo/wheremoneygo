package app.services;

import app.dto.TransactionRepsonseDTO;
import app.exceptions.ResourceNotFoundException;
import app.mappers.TransactionMapper;
import app.models.Transaction;
import app.models.User;
import app.repositories.TransactionRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    private final TransactionMapper transactionMapper;
    public List<TransactionRepsonseDTO> getTransactionsForBudget(Long id, User user){
        List<Transaction> transactions;

        transactions = transactionRepository.findByBudgetId(id);

        if(transactions.isEmpty()){
            throw new ResourceNotFoundException("No transactions found for budget");
        }

        return transactions.stream()
                .map(transactionMapper::transactionToTransactionRepsonseDTO)
                .collect(Collectors.toList());
    }
}
