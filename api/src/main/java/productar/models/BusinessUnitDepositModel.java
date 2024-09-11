package productar.models;

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

@Entity
@Table(name = "business_unit_deposit")
public class BusinessUnitDepositModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "business_unit_id", nullable = false)
    @NotNull(message = "La unidad de negocio no puede ser nula")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BusinessUnitModel businessUnit;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "deposit_id", nullable = false)
    @NotNull(message = "El deposito no puede ser nulo")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DepositModel deposit;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BusinessUnitModel getBusinessUnit() {
        return businessUnit;
    }

    public void setBusinessUnit(BusinessUnitModel businessUnit) {
        this.businessUnit = businessUnit;
    }

    public DepositModel getDeposit() {
        return deposit;
    }

    public void setDeposit(DepositModel deposit) {
        this.deposit = deposit;
    }

}
