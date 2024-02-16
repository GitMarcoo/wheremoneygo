package app.mappers;

import app.dto.BudgetResponseDTO;
import app.models.Budget;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BudgetMapper {

    BudgetResponseDTO budgetToBudgetResponseDTO(Budget budget);
}
