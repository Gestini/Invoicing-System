package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.EcommerceModel;

@Repository
public interface EcommerceRepository extends JpaRepository<EcommerceModel, Long> {
}
