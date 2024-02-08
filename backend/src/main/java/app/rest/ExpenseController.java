package app.rest;

import app.models.Expense;
import app.repositories.ExpenseRepositoryJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepositoryJPA expenseRepositoryJPA;

    @GetMapping()
    public ResponseEntity<List<Expense>> getExpenses() {
        return ResponseEntity.ok(expenseRepositoryJPA.findAll());
    }

    @GetMapping("/positive")
    public ResponseEntity<List<Expense>> getPositiveExpenses() {
        return ResponseEntity.ok(expenseRepositoryJPA.findByAmountGreaterThanOrEqualTo(0));
    }

    @GetMapping("/negative")
    public ResponseEntity<List<Expense>> getNegativeExpenses() {
        return ResponseEntity.ok(expenseRepositoryJPA.findByAmountLessThan(0));
    }

    @PostMapping("/{id}")
    public ResponseEntity<Expense> createExpense(@PathVariable Long id, @RequestBody Expense expense) {
        if (expense == null) {
            return ResponseEntity.badRequest().build();
        } else if (expenseRepositoryJPA.existsById(id)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(expenseRepositoryJPA.save(expense));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        if (expense == null) {
            return ResponseEntity.badRequest().build();
        } else if (!expenseRepositoryJPA.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(expenseRepositoryJPA.save(expense));
    }

    @PutMapping("/{id}/end")
    public ResponseEntity<Expense> endExpense(@PathVariable Long id) {
        if (!expenseRepositoryJPA.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        Expense expense = expenseRepositoryJPA.findById(id).get();
        expense.setEnd(LocalDateTime.now());
        return ResponseEntity.ok(expenseRepositoryJPA.save(expense));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Expense> deleteExpense(@PathVariable Long id) {
        if (!expenseRepositoryJPA.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        expenseRepositoryJPA.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
