package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.ProductModel;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    List<ProductModel> findByBusinessUnitId(Long businessUnitId);
}
