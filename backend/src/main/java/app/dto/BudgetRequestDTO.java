package app.dto;

import app.models.TimeInterval;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BudgetRequestDTO {
    private Long id;
    private String name;
    private TimeInterval timeInterval;
    private double amount;
    private LocalDate start;
    private LocalDate end;
    private boolean isRecurring;
}
