package gestini.modules.invoicing.models;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import gestini.modules.product.models.ProductModel;

@Entity
@Table(name = "Invoicing_product")
public class InvoicingProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    @NotNull(message = "Product cannot be null")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProductModel product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "invoicing_id", nullable = false)
    @NotNull(message = "Invoicing cannot be null")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private InvoicingModel invoicing;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductModel getProduct() {
        return product;
    }

    public void setProduct(ProductModel product) {
        this.product = product;
    }

    public InvoicingModel getInvoicing() {
        return invoicing;
    }

    public void setInvoicing(InvoicingModel invoicing) {
        this.invoicing = invoicing;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

}
