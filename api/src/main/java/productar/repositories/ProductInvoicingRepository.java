package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.ProductInvoicingModel;

@Repository
public interface ProductInvoicingRepository extends JpaRepository<ProductInvoicingModel, Long> {
}
