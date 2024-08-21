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

    @Query("SELECT COUNT(*) > 0 FROM RoleUsersModel ru JOIN RoleModel r ON ru.role.id = r.id JOIN RolePermissionsModel rp ON r.id = rp.role.id WHERE r.businessUnit.id = :unitId AND (rp.name = :permissionName OR rp.name = '*' OR rp.role.businessUnit.owner.id = :userId )")
    boolean hasPermissions(@Param("userId") Long userId,
            @Param("unitId") Long unitId,
            @Param("permissionName") String permissionName);

    @Query("SELECT COUNT(b) > 0 FROM BusinessUnitsModel b WHERE b.id = :unitId AND b.owner.id = :userId")
    boolean isOwner(@Param("userId") Long userId, @Param("unitId") Long unitId);

    @Modifying
    @Transactional
    @Query("DELETE FROM RoleUsersModel ru WHERE ru.role.id = :roleId AND ru.employee.id = :userId")
    void removeRole(@Param("roleId") Long roleId, @Param("userId") Long userId);

    @Query("SELECT ru FROM RoleUsersModel ru WHERE ru.role.id = :roleId")
    List<RoleUsersModel> findEmployeesByRole(@Param("roleId") Long roleId);

}
