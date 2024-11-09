package gestini.modules.invoicing.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import gestini.modules.invoicing.models.InvoicingModel;

@Repository
public interface InvoicingRepository extends JpaRepository<InvoicingModel, Long> {
    @Query("SELECT invoice FROM InvoicingModel invoice WHERE invoice.businessUnit.id = :businessUnitId")
    List<InvoicingModel> findByBusinessUnitId(Long businessUnitId);

    @Query("SELECT invoice FROM InvoicingModel invoice WHERE invoice.businessUnit.id = :businessUnitId AND invoice.createdAt BETWEEN :startDate AND :endDate")
    List<InvoicingModel> findInvoicesByUnitIdAndDateRange(
            @Param("businessUnitId") Long businessUnitId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    @Query("SELECT FUNCTION('DATE', invoice.createdAt) as day, COUNT(invoice) as count " +
            "FROM InvoicingModel invoice " +
            "WHERE invoice.businessUnit.id = :businessUnitId " +
            "AND invoice.createdAt BETWEEN :startDate AND :endDate " +
            "GROUP BY FUNCTION('DATE', invoice.createdAt) " +
            "ORDER BY day")
    List<Object[]> getDailySalesForCurrentMonth(
            @Param("businessUnitId") Long businessUnitId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    @Query("SELECT invoice.seller.username, COUNT(invoice) as saleCount " +
            "FROM InvoicingModel invoice " +
            "WHERE invoice.businessUnit.id = :businessUnitId " +
            "AND FUNCTION('MONTH', invoice.createdAt) = :month " +
            "AND FUNCTION('YEAR', invoice.createdAt) = :year " +
            "GROUP BY invoice.seller.username " +
            "ORDER BY saleCount DESC")
    List<Object[]> getTopSellersBySalesForMonth(@Param("businessUnitId") Long businessUnitId,
            @Param("month") int month,
            @Param("year") int year);

}