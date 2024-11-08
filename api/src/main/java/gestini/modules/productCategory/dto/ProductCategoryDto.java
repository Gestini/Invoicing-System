package gestini.modules.productCategory.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public class ProductCategoryDto {

    @Schema(description = "Nombre de la categoría", required = true)
    @NotBlank(message = "El nombre no puede estar vacío")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
