package gestini.modules.ecommerce.models;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import gestini.modules.product.models.ProductModel;

@Entity
@Table(name = "ecommerce_product")
public class EcommerceProductModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ecommerce_category_id", nullable = false)
    @NotNull(message = "La categoría del ecommerce no puede ser nula")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private EcommerceCategoryModel ecommerceCategory;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    @NotNull(message = "El producto no puede ser nulo")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProductModel product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EcommerceCategoryModel getEcommerceCategory() {
        return ecommerceCategory;
    }

    public void setEcommerceCategory(EcommerceCategoryModel ecommerceCategory) {
        this.ecommerceCategory = ecommerceCategory;
    }

    public ProductModel getProduct() {
        return product;
    }

    public void setProduct(ProductModel product) {
        this.product = product;
    }

}
