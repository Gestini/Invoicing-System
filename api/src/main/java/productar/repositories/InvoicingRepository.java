package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import productar.models.InvoicingModel;

@Repository
public interface InvoicingRepository extends JpaRepository<InvoicingModel, Long> {
    @Query("SELECT invoice FROM InvoicingModel invoice WHERE invoice.businessUnit.id = :businessUnitId")
    List<InvoicingModel> findByBusinessUnitId(Long businessUnitId);
}