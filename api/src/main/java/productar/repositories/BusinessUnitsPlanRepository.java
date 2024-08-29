package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.BusinessUnitPlanModel;

@Repository
public interface BusinessUnitsPlanRepository extends JpaRepository<BusinessUnitPlanModel, Long> {
}
