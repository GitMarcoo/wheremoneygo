package app.models;

import jakarta.persistence.*;
import lombok.*;

/**
 * The pruspose of this class is to save a daily waypoint of a users budget like savings, so
 * we can track the amount increasing or decreasing instead of calculating it every time.
 */

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class BudgetDailySavePoint extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name="budget_id")
    private Budget budget;

    private double amount;
}
