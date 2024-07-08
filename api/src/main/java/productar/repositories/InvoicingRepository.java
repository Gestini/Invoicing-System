package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.InvoicingModel;

@Repository
public interface InvoicingRepository extends JpaRepository<InvoicingModel, Long> {
    List<InvoicingModel> findByBusinessUnitId(Long businessUnitId);
}