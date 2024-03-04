package app.repositories;

import app.models.BudgetDailySavePoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetDailySavePointRepository extends JpaRepository<BudgetDailySavePoint, Long> {
}
