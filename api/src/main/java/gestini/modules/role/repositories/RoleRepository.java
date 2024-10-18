package gestini.modules.role.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import gestini.modules.role.models.RoleModel;

@Repository
public interface RoleRepository extends JpaRepository<RoleModel, Long> {

    @Query("SELECT r FROM RoleModel r " +
            "LEFT JOIN FETCH r.permissions p " +
            "LEFT JOIN FETCH r.users ru " +
            "LEFT JOIN FETCH ru.employee e " +
            "WHERE r.businessUnit.id = :businessUnitId")
    List<RoleModel> findByBusinessUnitIdWithPermissions(@Param("businessUnitId") Long businessUnitId);
}