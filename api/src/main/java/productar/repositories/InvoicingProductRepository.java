package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import productar.models.InvoicingProductModel;

@Repository
public interface InvoicingProductRepository extends JpaRepository<InvoicingProductModel, Long> {

    @Query("SELECT invoicingProduct FROM InvoicingProductModel invoicingProduct WHERE invoicingProduct.invoicing.id = :invoiceId")
    List<InvoicingProductModel> findAllInvoiceProduct(@PathVariable Long invoiceId);
}