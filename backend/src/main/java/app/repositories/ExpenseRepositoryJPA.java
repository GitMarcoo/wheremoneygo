package app.repositories;

import app.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("expenseRepositoryJPA")
public interface ExpenseRepositoryJPA extends JpaRepository<Expense, Long> {
    @Query("SELECT e FROM Expense e WHERE e.amount >= :amount")
    List<Expense> findByAmountGreaterThanOrEqualTo(@Param("amount") double amount);

    @Query("SELECT e FROM Expense e WHERE e.amount < :amount")
    List<Expense> findByAmountLessThan(@Param("amount") double i);
}
