package productar.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import productar.models.RoleUsersModel;

@Repository
public interface RoleUsersRepository extends JpaRepository<RoleUsersModel, Long> {

    @Query("SELECT ru FROM RoleUsersModel ru WHERE ru.role.id = :roleId AND ru.employee.id = :userId")
    Optional<RoleUsersModel> userHasRole(@Param("roleId") Long roleId, @Param("userId") Long userId);

    @Query("SELECT EXISTS ("
            + "SELECT 1 FROM BusinessUnitsModel b "
            + "WHERE b.id = :unitId AND b.owner.id = :userId) "
            + "OR ("
            + "EXISTS (SELECT 1 FROM EmployeeModel e "
            + "WHERE e.user.id = :userId AND e.businessUnit.id = :unitId) "
            + "AND (:permissionName = 'none' OR EXISTS ("
            + "SELECT 1 FROM RoleUsersModel ru "
            + "JOIN RoleModel r ON ru.role.id = r.id "
            + "JOIN RolePermissionsModel rp ON r.id = rp.role.id "
            + "WHERE ru.employee.user.id = :userId "
            + "AND r.businessUnit.id = :unitId "
            + "AND (rp.name = :permissionName OR rp.name = '*'))))")
    boolean hasPermissions(@Param("userId") Long userId,
            @Param("unitId") Long unitId,
            @Param("permissionName") String permissionName);

    @Modifying
    @Transactional
    @Query("DELETE FROM RoleUsersModel ru WHERE ru.role.id = :roleId AND ru.employee.id = :userId")
    void removeRole(@Param("roleId") Long roleId, @Param("userId") Long userId);

    @Query("SELECT ru FROM RoleUsersModel ru WHERE ru.role.id = :roleId")
    List<RoleUsersModel> findEmployeesByRole(@Param("roleId") Long roleId);

}
