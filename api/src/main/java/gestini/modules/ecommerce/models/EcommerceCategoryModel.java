package gestini.modules.ecommerce.models;

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

@Entity
@Table(name = "ecommerce_category")
public class EcommerceCategoryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ecommerce_id", nullable = false)
    @NotNull(message = "El ecommerce no puede ser nulo")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private EcommerceModel ecommerce;

    @Column
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EcommerceModel getEcommerce() {
        return ecommerce;
    }

    public void setEcommerce(EcommerceModel ecommerce) {
        this.ecommerce = ecommerce;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
