package productar.dto;

import java.time.LocalDateTime;

public class ProductResponseDTO {
    private Long id;
    private String codigo1;
    private String codigo2;
    private String barcode;
    private String image;
    private Double price;
    private Double cardPrice;
    private Double financedPrice;
    private Double friendPrice;
    private Double purchasePrice;
    private String priceCalculation;
    private Double costPrice;
    private Integer quantity;
    private String category;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean status;
    private String pricePolicy;
    private Double net1;
    private Double net2;
    private Double net3;
    private Double net4;
    private String taxType;
    private String referenceCode;
    private Boolean packageProduct;
    private Integer quantityPerPackage;
    private Long businessUnitId;
    private Long depositUnitId;

    public Long getDepositUnitId() {
        return depositUnitId;
    }

    public void setDepositUnitId(Long depositUnitId) {
        this.depositUnitId = depositUnitId;
    }

    public Long getBusinessUnitId() {
        return businessUnitId;
    }

    public void setBusinessUnitId(Long businessUnitId) {
        this.businessUnitId = businessUnitId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    // getters and setters
}
