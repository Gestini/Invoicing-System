package gestini.modules.company.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gestini.modules.company.models.CompanyPlanModel;

@Repository
public interface CompanyPlanRepository extends JpaRepository<CompanyPlanModel, Long> {
}
