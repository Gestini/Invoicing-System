package gestini.modules.employee.models;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.user.models.User;

@Entity
@Table(name = "employee")
public class EmployeeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "business_unit_id", nullable = false)
    @NotNull(message = "La unidad de negocio no puede ser nula")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BusinessUnitModel businessUnit;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @Column
    private String name;

    @Column
    private String lastname;

    @Column
    private String email;

    @Enumerated(EnumType.STRING)
    @Column
    private EmployeeStatus status;

    @Column
    private String pin;

    public enum EmployeeStatus {
        INACTIVE,
        PENDING,
        ACTIVE
    }

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public EmployeeStatus getStatus() {
        return status;
    }

    public void setStatus(EmployeeStatus status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
