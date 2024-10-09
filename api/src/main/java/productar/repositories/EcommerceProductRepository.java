package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.EcommerceProductModel;

@Repository
public interface EcommerceProductRepository extends JpaRepository<EcommerceProductModel, Long> {
}
