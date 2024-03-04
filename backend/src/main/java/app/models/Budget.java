package app.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Budget extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private TimeInterval timeInterval;

    private double amount;

    private LocalDate start;

    private LocalDate end;

    private boolean isDeleted;

    @Column(name = "is_recurring", columnDefinition = "boolean default false")
    private boolean isRecurring;

    @Column(name = "is_savings", columnDefinition = "boolean default false")
    private boolean isSavings;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
