package gestini.modules.company.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import gestini.modules.company.models.CompanyModel;

@Repository
public interface CompanyRepository extends JpaRepository<CompanyModel, Long> {

    @Query("SELECT DISTINCT c FROM CompanyModel c " +
            "LEFT JOIN BusinessUnitModel bu ON bu.company = c " +
            "LEFT JOIN EmployeeModel e ON e.businessUnit = bu " +
            "WHERE (c.owner.id = :userId) OR (e.user.id = :userId AND e.status = ACTIVE)")
    List<CompanyModel> findCompaniesWithUserAsOwnerOrEmployee(Long userId);

    @Query("SELECT company FROM CompanyModel company WHERE company.owner.id = :ownerId")
    List<CompanyModel> findCompaniesByOwnerId(Long ownerId);
}
