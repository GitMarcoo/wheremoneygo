package app.repositories;

import app.models.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("expenseRepositoryJPA")
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    @Query("SELECT e FROM Budget e WHERE e.amount >= :amount AND e.user.id = :userId AND e.isSavings = false")
    List<Budget> findByUserAndByAmountGreaterThanOrEqualTo(@Param("amount") double amount , @Param("userId") long userId);

    @Query("SELECT e FROM Budget e WHERE e.amount < :amount AND e.user.id = :userId AND e.isSavings = false")
    List<Budget> findByUserAndByAmountLessThan(@Param("amount") double i, @Param("userId") long userId);

    @Query("SELECT e FROM Budget e WHERE e.isSavings = true AND e.user.id = :userId")
    List<Budget> findByUserAndBySavingsTrue(@Param("userId") Long id);
}
