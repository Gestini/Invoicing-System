package gestini.modules.invoicing.dto;

import jakarta.annotation.Nullable;

public class InvoicingDto {
    private Long id;
    private Integer total;
    private String sellerName;
    private String createdAt;

    @Nullable
    private String discountCode;

    public InvoicingDto(Long id, Integer total, String sellerName, String createdAt, String discountCode) {
        this.id = id;
        this.total = total;
        this.sellerName = sellerName;
        this.createdAt = createdAt;
        this.discountCode = discountCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getDiscountCode() {
        return discountCode;
    }

    public void setDiscountCode(String discountCode) {
        this.discountCode = discountCode;
    }

}
