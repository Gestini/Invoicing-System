package gestini.modules.inventory.dto;

import org.hibernate.validator.constraints.Range;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class InventoryRequestDto {

    @Schema(description = "ID del producto", example = "1", required = true)
    @NotNull(message = "El ID del producto no puede ser nulo.")
    @Positive(message = "El ID del producto debe ser un número positivo.")
    private Long productId;

    @Schema(description = "Cantidad de productos en inventario", example = "10", required = true)
    @NotNull(message = "La cantidad no puede ser nula.")
    @Range(min = 1, message = "La cantidad debe ser al menos 1.")
    private Integer quantity;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
