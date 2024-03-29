package app.mappers;

import app.dto.BudgetResponseDTO;
import app.models.Budget;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BudgetMapper {

    @Mapping(target = "isRecurring", source = "recurring")
    BudgetResponseDTO budgetToBudgetResponseDTO(Budget budget);
}
