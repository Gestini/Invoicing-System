package productar.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "products")
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Size(max = 100, message = "El código 1 debe tener como máximo 100 caracteres")
    private String codigo1;

    @Column
    @Size(max = 100, message = "El código 2 debe tener como máximo 100 caracteres")
    private String codigo2;

    @Column
    @Size(max = 255, message = "El código de barras debe tener como máximo 255 caracteres")
    private String barcode;

    @Column
    private String image;

    @Column
    @DecimalMin(value = "0.0", message = "El precio debe ser mayor o igual que cero")
    private Double price;

    @Column(name = "card_price")
    @DecimalMin(value = "0.0", message = "El precio de tarjeta debe ser mayor o igual que cero")
    private Double cardPrice;

    @Column(name = "financed_price")
    @DecimalMin(value = "0.0", message = "El precio financiado debe ser mayor o igual que cero")
    private Double financedPrice;

    @Column(name = "friend_price")
    @DecimalMin(value = "0.0", message = "El precio de amigo debe ser mayor o igual que cero")
    private Double friendPrice;

    @Column(name = "purchase_price")
    @DecimalMin(value = "0.0", message = "El precio de compra debe ser mayor o igual que cero")
    private Double purchasePrice;

    @Column(name = "price_calculation")
    private String priceCalculation;

    @Column(name = "cost_price")
    private Double costPrice;

    @Column
    @Min(value = 0, message = "La cantidad debe ser mayor o igual que cero")
    private Integer quantity;

    @Column
    @Size(min = 1, max = 100, message = "La categoría debe tener entre 1 y 100 caracteres")
    private String category;

    @Column
    @NotNull(message = "El nombre no puede ser nulo")
    @Size(min = 1, max = 100, message = "El nombre debe tener entre 1 y 100 caracteres")
    private String name;

    @Column
    @Size(max = 255, message = "La descripción debe tener menos de 255 caracteres")
    private String description;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @Column
    private Boolean status = true;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "business_unit_id", nullable = false)
    @NotNull(message = "La unidad de negocio no puede ser nula")
    private BusinessUnitsModel businessUnit;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "deposit_unit_id", nullable = true)
    private DepositUnitsModel depositUnit;

    @Column(name = "price_policy")
    private String pricePolicy;

    @Column
    private Double net1;

    @Column
    private Double net2;

    @Column
    private Double net3;

    @Column
    private Double net4;

    @Column(name = "tax_type")
    private String taxType;

    @Column(name = "reference_code")
    private String referenceCode;

    @Column(name = "package_product")
    private Boolean packageProduct;

    @Column(name = "quantity_per_package")
    private Integer quantityPerPackage;

    public DepositUnitsModel getDepositUnit() {
        return depositUnit;
    }

    public void setDepositUnit(DepositUnitsModel depositUnit) {
        this.depositUnit = depositUnit;
    }

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public BusinessUnitsModel getBusinessUnit() {
        return businessUnit;
    }

    public void setBusinessUnit(BusinessUnitsModel businessUnit) {
        this.businessUnit = businessUnit;
    }

    // Lifecycle Callbacks

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
