package app.dto;

import app.models.TimeInterval;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BudgetResponseDTO {
    private Long id;
    private String name;
    private TimeInterval timeInterval;
    private double amount;
    private String start;
    private String end;
    private boolean isRecurring;
}
