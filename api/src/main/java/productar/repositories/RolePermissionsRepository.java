package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.RolePermissionsModel;

@Repository
public interface RolePermissionsRepository extends JpaRepository<RolePermissionsModel, Long> {
    List<RolePermissionsModel> findByRoleId(Long roleId);
}
