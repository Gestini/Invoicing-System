package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.BusinessUnitsModel;

@Repository
public interface BusinessUnitsRepository extends JpaRepository<BusinessUnitsModel, Long> {

}