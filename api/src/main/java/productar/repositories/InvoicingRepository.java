package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import productar.models.InvoicingModel;

@Repository
public interface InvoicingRepository extends JpaRepository<InvoicingModel, Long> {
    @Query("SELECT i FROM InvoicingModel i LEFT JOIN FETCH i.products WHERE i.businessUnit.id = :businessUnitId")
    List<InvoicingModel> findByBusinessUnitId(Long businessUnitId);
}