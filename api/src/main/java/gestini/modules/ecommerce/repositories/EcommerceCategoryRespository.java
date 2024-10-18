package gestini.modules.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gestini.modules.ecommerce.models.EcommerceCategoryModel;

@Repository
public interface EcommerceCategoryRespository extends JpaRepository<EcommerceCategoryModel, Long> {
}
