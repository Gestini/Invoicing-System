package gestini.modules.employee.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import gestini.modules.employee.models.EmployeeModel;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeModel, Long> {
    List<EmployeeModel> findByBusinessUnitId(Long businessUnitId);

    List<EmployeeModel> findByUserUsername(String username);

    @Query("SELECT employee FROM EmployeeModel employee WHERE employee.businessUnit.id = :unitId AND LOWER(employee.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<EmployeeModel> searchEmployeeByName(@Param("unitId") Long unitId, @Param("name") String name);

    @Modifying
    @Transactional
    @Query("DELETE FROM EmployeeModel employee WHERE employee.businessUnit.id = :unitId AND employee.user.id = :userId")
    int leaveUnit(@Param("userId") Long userId, @Param("unitId") Long unitId);
}
