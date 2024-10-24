package gestini.modules.businessUnit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gestini.modules.businessUnit.models.BusinessUnitPlanModel;

@Repository
public interface BusinessUnitsPlanRepository extends JpaRepository<BusinessUnitPlanModel, Long> {
}
