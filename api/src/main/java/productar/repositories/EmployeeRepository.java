package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import productar.models.EmployeeModel;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeModel, Long> {
    List<EmployeeModel> findByBusinessUnitId(Long businessUnitId);

    @Query("SELECT employee FROM EmployeeModel employee WHERE LOWER(employee.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<EmployeeModel> searchByName(@Param("name") String name);
}
