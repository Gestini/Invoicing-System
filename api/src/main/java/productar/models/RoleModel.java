package productar.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.Set;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "roles")
public class RoleModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "business_unit_id", nullable = false)
    @NotNull(message = "Business unit cannot be null")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BusinessUnitModel businessUnit;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference("permRef")
    private Set<RolePermissionsModel> permissions;
    
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference("userRef")
    private Set<RoleUsersModel> users;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BusinessUnitModel getBusinessUnit() {
        return businessUnit;
    }

    public void setBusinessUnit(BusinessUnitModel businessUnit) {
        this.businessUnit = businessUnit;
    }

    public Set<RolePermissionsModel> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<RolePermissionsModel> permissions) {
        this.permissions = permissions;
    }

    public Set<RoleUsersModel> getUsers() {
        return users;
    }

    public void setUsers(Set<RoleUsersModel> users) {
        this.users = users;
    }
}
