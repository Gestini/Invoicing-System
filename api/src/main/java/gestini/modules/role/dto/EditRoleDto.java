package gestini.modules.role.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public class EditRoleDto {

    @NotBlank(message = "El nombre del rol es obligatorio.")
    @Schema(example = "ADMIN", description = "Nombre del rol a crear.")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
