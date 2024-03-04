package app.rest;

import app.models.User;
import app.services.TransactionService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getTransactionsForBudget(@NonNull @AuthenticationPrincipal User user,
                                                      @NonNull @RequestParam Long budget_id){
        return ResponseEntity.ok(transactionService.getTransactionsForBudget(budget_id, user));
    }
}
