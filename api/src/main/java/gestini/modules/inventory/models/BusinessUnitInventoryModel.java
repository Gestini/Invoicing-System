package gestini.modules.inventory.models;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.product.models.ProductModel;

@Entity
@Table(name = "business_unit_inventory")
public class BusinessUnitInventoryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    @NotNull(message = "Product cannot be null")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProductModel product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "business_unit_id", nullable = false)
    @NotNull(message = "Business unit cannot be null")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BusinessUnitModel businessUnit;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ProductModel getProduct() {
        return product;
    }

    public void setProduct(ProductModel product) {
        this.product = product;
    }

    public BusinessUnitModel getBusinessUnit() {
        return businessUnit;
    }

    public void setBusinessUnit(BusinessUnitModel businessUnit) {
        this.businessUnit = businessUnit;
    }

}
