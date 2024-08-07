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

    @Modifying
    @Transactional
    @Query("DELETE FROM RoleUsersModel ru WHERE ru.role.id = :roleId AND ru.employee.id = :userId")
    void removeRole(@Param("roleId") Long roleId, @Param("userId") Long userId);

    @Query("SELECT ru FROM RoleUsersModel ru WHERE ru.role.id = :roleId")
    List<RoleUsersModel> findEmployeesByRole(@Param("roleId") Long roleId);

}
