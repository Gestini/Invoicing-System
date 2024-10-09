package productar.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.BusinessUnitIntegrationModel;

@Repository
public interface BusinessUnitIntegrationRepository extends JpaRepository<BusinessUnitIntegrationModel, Long> {
    List<BusinessUnitIntegrationModel> findByBusinessUnitId(Long businessUnitId);

    Optional<BusinessUnitIntegrationModel> findByBusinessUnitIdAndIntegrationId(Long businessUnitId,
            Long integrationId);

}