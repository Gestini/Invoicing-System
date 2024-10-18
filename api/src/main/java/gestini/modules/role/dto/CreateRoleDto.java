package gestini.modules.role.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import io.swagger.v3.oas.annotations.media.Schema;

public class CreateRoleDto {

    @NotBlank(message = "El nombre del rol es obligatorio.")
    @Schema(example = "ADMIN", description = "Nombre del rol a crear.")
    private String name;

    @NotNull(message = "Id de la unidad de negocio es obligatorio")
    @Schema(example = "1", description = "Id de la unidad de negocio")
    private Long unitId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getUnitId() {
        return unitId;
    }

    public void setUnitId(Long unitId) {
        this.unitId = unitId;
    }
}
