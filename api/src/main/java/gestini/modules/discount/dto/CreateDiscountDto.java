package gestini.modules.discount.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class CreateDiscountDto {

    @Schema(description = "Valor del descuento", required = true, example = "10.0")
    @NotNull(message = "El valor del descuento no puede estar vacío")
    @Positive(message = "El valor del descuento debe ser positivo")
    private Float value;

    @Schema(description = "Maximo de usos", required = false, example = "10")
    @Positive(message = "El valor de usos debe ser positivo")
    private Integer maxUsages;

    @Schema(description = "Tipo de descuento", required = true, example = "PERCENTAGE")
    @NotNull(message = "El tipo de descuento no puede estar vacío")
    private DiscountType type;

    @Schema(description = "Descripción del descuento", example = "Descuento por Año Nuevo")
    private String description;

    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    public Integer getMaxUsages() {
        return maxUsages;
    }

    public void setMaxUsages(Integer maxUsages) {
        this.maxUsages = maxUsages;
    }

    public DiscountType getType() {
        return type;
    }

    public void setType(DiscountType type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
