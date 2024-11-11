package gestini.modules.product.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

import gestini.modules.product.models.ProductModel.ProductStatus;

public class ProductDto {

    @Schema(description = "Código 1 del producto, máximo 100 caracteres")
    @Size(max = 100, message = "El código 1 debe tener como máximo 100 caracteres")
    private String codigo1;

    @Schema(description = "Código 2 del producto, máximo 100 caracteres")
    @Size(max = 100, message = "El código 2 debe tener como máximo 100 caracteres")
    private String codigo2;

    @Schema(description = "Código de barras, máximo 255 caracteres")
    @Size(max = 255, message = "El código de barras debe tener como máximo 255 caracteres")
    private String barcode;

    @Schema(description = "URL de la imagen del producto")
    private String image;

    @Schema(description = "Precio del producto")
    @DecimalMin(value = "0.0", message = "El precio debe ser mayor o igual que cero")
    private Double price;

    @Schema(description = "Precio con tarjeta")
    @DecimalMin(value = "0.0", message = "El precio de tarjeta debe ser mayor o igual que cero")
    private Double cardPrice;

    @Schema(description = "Precio financiado")
    @DecimalMin(value = "0.0", message = "El precio financiado debe ser mayor o igual que cero")
    private Double financedPrice;

    @Schema(description = "Precio de amigo")
    @DecimalMin(value = "0.0", message = "El precio de amigo debe ser mayor o igual que cero")
    private Double friendPrice;

    @Schema(description = "Precio de compra")
    @DecimalMin(value = "0.0", message = "El precio de compra debe ser mayor o igual que cero")
    private Double purchasePrice;

    @Schema(description = "Tipo de cálculo de precio")
    private String priceCalculation;

    @Schema(description = "Precio de costo")
    private Double costPrice;

    @Schema(description = "Cantidad en inventario")
    @Min(value = 0, message = "La cantidad debe ser mayor o igual que cero")
    private Integer quantity;

    @Schema(description = "Nombre del producto", required = true)
    @NotNull(message = "El nombre no puede estar vacío")
    @Size(min = 1, max = 100, message = "El nombre debe tener entre 1 y 100 caracteres")
    private String name;

    @Schema(description = "Descripción del producto, máximo 255 caracteres")
    @Size(max = 255, message = "La descripción debe tener menos de 255 caracteres")
    private String description;

    @Schema(description = "Fecha de creación del producto")
    private LocalDateTime createdAt;

    @Schema(description = "Fecha de última actualización del producto")
    private LocalDateTime updatedAt;

    @Schema(description = "Estado del producto")
    private ProductStatus status;

    @Schema(description = "ID del proveedor")
    private Long supplierId;

    @Schema(description = "ID de la categoría del producto")
    private Long categoryId;

    @Schema(description = "ID del depósito", required = true)
    @NotNull(message = "El ID del depósito es obligatorio")
    private Long depositId;

    @Schema(description = "Política de precios")
    private String pricePolicy;

    @Schema(description = "Neto 1")
    private Double net1;

    @Schema(description = "Neto 2")
    private Double net2;

    @Schema(description = "Neto 3")
    private Double net3;

    @Schema(description = "Neto 4")
    private Double net4;

    @Schema(description = "Tipo de impuesto")
    private String taxType;

    @Schema(description = "Código de referencia")
    private String referenceCode;

    @Schema(description = "Indica si el producto es un paquete")
    private Boolean packageProduct;

    @Schema(description = "Cantidad por paquete")
    private Integer quantityPerPackage;

    public String getCodigo1() {
        return codigo1;
    }

    public void setCodigo1(String codigo1) {
        this.codigo1 = codigo1;
    }

    public String getCodigo2() {
        return codigo2;
    }

    public void setCodigo2(String codigo2) {
        this.codigo2 = codigo2;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getCardPrice() {
        return cardPrice;
    }

    public void setCardPrice(Double cardPrice) {
        this.cardPrice = cardPrice;
    }

    public Double getFinancedPrice() {
        return financedPrice;
    }

    public void setFinancedPrice(Double financedPrice) {
        this.financedPrice = financedPrice;
    }

    public Double getFriendPrice() {
        return friendPrice;
    }

    public void setFriendPrice(Double friendPrice) {
        this.friendPrice = friendPrice;
    }

    public Double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(Double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public String getPriceCalculation() {
        return priceCalculation;
    }

    public void setPriceCalculation(String priceCalculation) {
        this.priceCalculation = priceCalculation;
    }

    public Double getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(Double costPrice) {
        this.costPrice = costPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getDepositId() {
        return depositId;
    }

    public void setDepositId(Long depositId) {
        this.depositId = depositId;
    }

    public String getPricePolicy() {
        return pricePolicy;
    }

    public void setPricePolicy(String pricePolicy) {
        this.pricePolicy = pricePolicy;
    }

    public Double getNet1() {
        return net1;
    }

    public void setNet1(Double net1) {
        this.net1 = net1;
    }

    public Double getNet2() {
        return net2;
    }

    public void setNet2(Double net2) {
        this.net2 = net2;
    }

    public Double getNet3() {
        return net3;
    }

    public void setNet3(Double net3) {
        this.net3 = net3;
    }

    public Double getNet4() {
        return net4;
    }

    public void setNet4(Double net4) {
        this.net4 = net4;
    }

    public String getTaxType() {
        return taxType;
    }

    public void setTaxType(String taxType) {
        this.taxType = taxType;
    }

    public String getReferenceCode() {
        return referenceCode;
    }

    public void setReferenceCode(String referenceCode) {
        this.referenceCode = referenceCode;
    }

    public Boolean getPackageProduct() {
        return packageProduct;
    }

    public void setPackageProduct(Boolean packageProduct) {
        this.packageProduct = packageProduct;
    }

    public Integer getQuantityPerPackage() {
        return quantityPerPackage;
    }

    public void setQuantityPerPackage(Integer quantityPerPackage) {
        this.quantityPerPackage = quantityPerPackage;
    }

    public ProductStatus getStatus() {
        return status;
    }

    public void setStatus(ProductStatus status) {
        this.status = status;
    }
}
