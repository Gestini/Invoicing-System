package gestini.modules.report;

import java.sql.Date;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import gestini.modules.invoicing.models.InvoicingModel;
import gestini.modules.invoicing.repositories.InvoicingProductRepository;
import gestini.modules.invoicing.repositories.InvoicingRepository;
import gestini.modules.report.dto.DailySalesDto;
import gestini.modules.report.dto.TopSellerDto;
import gestini.modules.report.dto.TopSellingProductDto;

@Service
public class ReportService {
    @Autowired
    private InvoicingRepository invoicingRepository;

    @Autowired
    private InvoicingProductRepository invoicingProductRepository;

    public ResponseEntity<?> findInvoicesByUnitIdAndDateRange(Long unitId) {
        try {
            YearMonth currentMonth = YearMonth.now();
            LocalDate starDate = currentMonth.atDay(1);
            LocalDate endDate = currentMonth.atEndOfMonth();

            List<InvoicingModel> monthlySales = invoicingRepository.findInvoicesByUnitIdAndDateRange(unitId, starDate,
                    endDate);

            return ResponseEntity.ok(monthlySales);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error" + e.getMessage());
        }
    }

    public List<DailySalesDto> getDailySalesForCurrentMonth(Long businessUnitId) {
        YearMonth currentMonth = YearMonth.now();
        LocalDate startDate = currentMonth.atDay(1);
        LocalDate endDate = currentMonth.atEndOfMonth();

        List<Object[]> rawSalesData = invoicingRepository.getDailySalesForCurrentMonth(businessUnitId, startDate,
                endDate);

        List<DailySalesDto> formattedData = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Object[] result : rawSalesData) {
            Long count = (Long) result[1];
            Date sqlDate = (Date) result[0];

            LocalDate day = sqlDate.toLocalDate();
            String formattedDate = day.format(formatter);
            DailySalesDto dataEntry = new DailySalesDto(formattedDate, count.intValue());

            formattedData.add(dataEntry);
        }

        return formattedData;
    }

    public List<TopSellerDto> getTopSellersBySalesForMonth(Long businessUnitId, int month, int year) {
        List<Object[]> rawData = invoicingRepository.getTopSellersBySalesForMonth(businessUnitId, month, year);

        List<TopSellerDto> formattedData = new ArrayList<>();
        for (Object[] result : rawData) {
            String username = (String) result[0];
            Long saleCount = (Long) result[1];

            TopSellerDto topSeller = new TopSellerDto(username, saleCount);
            formattedData.add(topSeller);
        }

        return formattedData;
    }

    public List<TopSellingProductDto> getTopSellingProducts(Long businessUnitId) {
        List<Object[]> rawData = invoicingProductRepository.findTopSellingProductsByBusinessUnit(businessUnitId);
        List<TopSellingProductDto> topSellingProducts = new ArrayList<>();

        for (Object[] result : rawData) {
            String productName = (String) result[0];
            Long totalQuantitySold = (Long) result[1];
            topSellingProducts.add(new TopSellingProductDto(productName, totalQuantitySold));
        }

        return topSellingProducts;
    }

}
