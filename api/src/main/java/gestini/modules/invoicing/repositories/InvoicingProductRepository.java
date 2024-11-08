package gestini.modules.invoicing.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import gestini.modules.invoicing.models.InvoicingProductModel;

@Repository
public interface InvoicingProductRepository extends JpaRepository<InvoicingProductModel, Long> {

    @Query("SELECT invoicingProduct FROM InvoicingProductModel invoicingProduct WHERE invoicingProduct.invoicing.id = :invoiceId")
    List<InvoicingProductModel> findAllInvoiceProduct(@PathVariable Long invoiceId);

    @Query("SELECT invoicingProduct.product.name, SUM(invoicingProduct.quantity) AS totalQuantitySold " +
            "FROM InvoicingProductModel invoicingProduct " +
            "WHERE invoicingProduct.invoicing.businessUnit.id = :businessUnitId " +
            "GROUP BY invoicingProduct.product.id, invoicingProduct.product.name " +
            "ORDER BY totalQuantitySold DESC")
    List<Object[]> findTopSellingProductsByBusinessUnit(@Param("businessUnitId") Long businessUnitId);
}