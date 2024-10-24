package gestini.modules.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gestini.modules.ecommerce.models.EcommerceProductModel;

@Repository
public interface EcommerceProductRepository extends JpaRepository<EcommerceProductModel, Long> {
}
