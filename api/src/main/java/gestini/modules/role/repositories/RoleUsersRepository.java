package gestini.modules.role.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import gestini.modules.role.models.RoleUsersModel;
import gestini.utils.Permission;
import jakarta.transaction.Transactional;

@Repository
public interface RoleUsersRepository extends JpaRepository<RoleUsersModel, Long> {

    @Query("SELECT ru FROM RoleUsersModel ru WHERE ru.role.id = :roleId AND ru.employee.id = :userId")
    Optional<RoleUsersModel> userHasRole(Long roleId, Long userId);

    @Query("SELECT " +
            "    EXISTS ( " +
            "        SELECT 1 " +
            "        FROM BusinessUnitModel b " +
            "        JOIN b.company cm " +
            "        LEFT JOIN cm.plan cpm " +
            "        LEFT JOIN PlanPermissionsModel ppm ON cpm.plan.id = ppm.plan.id " +
            "        WHERE b.id = :unitId " +
            "        AND cm.owner.id = :userId " +
            "        AND (:permission = 'DEFAULT_ACCESS' OR ppm.name = :permission OR ppm.name = 'ADMIN') "
            +
            "    ) " +
            "OR ( " +
            "    EXISTS ( " +
            "        SELECT 1 " +
            "        FROM EmployeeModel e " +
            "        WHERE e.user.id = :userId " +
            "        AND e.businessUnit.id = :unitId " +
            "        AND e.status = 'ACTIVE' " +
            "    ) " +
            "    AND ( " +
            "        :permission = 'DEFAULT_ACCESS' " +
            "        OR EXISTS ( " +
            "            SELECT 1 " +
            "            FROM RoleUsersModel ru " +
            "            JOIN ru.role r " +
            "            JOIN RolePermissionsModel rp ON r.id = rp.role.id " +
            "            JOIN CompanyModel cm ON cm.id = r.businessUnit.company.id " +
            "            LEFT JOIN cm.plan cpm " +
            "            LEFT JOIN PlanPermissionsModel ppm ON cpm.plan.id = ppm.plan.id " +
            "            WHERE ru.employee.user.id = :userId " +
            "            AND r.businessUnit.id = :unitId " +
            "            AND (rp.name = :permission OR rp.name = 'ADMIN') " +
            "            AND (ppm.name = :permission OR ppm.name = 'ADMIN') " +
            "        ) " +
            "    ) " +
            ")")
    boolean hasPermissions(Long userId, Long unitId, Permission permission);

    @Modifying
    @Transactional
    @Query("DELETE FROM RoleUsersModel ru WHERE ru.role.id = :roleId AND ru.employee.id = :userId")
    void removeRole(Long roleId, Long userId);

    @Query("SELECT ru FROM RoleUsersModel ru WHERE ru.role.id = :roleId")
    List<RoleUsersModel> findEmployeesByRole(Long roleId);

}
