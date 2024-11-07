package gestini.modules.report;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gestini.modules.report.dto.DailySalesDto;
import gestini.modules.report.dto.TopSellerDto;
import gestini.modules.report.dto.TopSellingProductDto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/report")
@SecurityRequirement(name = "BearerAuth")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/get-invoices-by-date-range/{unitId}")
    public ResponseEntity<?> findInvoicesByUnitIdAndDateRange(@PathVariable("unitId") Long unitId) {
        return reportService.findInvoicesByUnitIdAndDateRange(unitId);
    }

    @GetMapping("/get-sales-by-month/{unitId}")
    public List<DailySalesDto> getFormattedValues(@PathVariable("unitId") Long unitId) {
        return reportService.getDailySalesForCurrentMonth(unitId);
    }

    @GetMapping("/get-top-sellers/{unitId}")
    public List<TopSellerDto> getTopSellersBySalesForMonth(@PathVariable("unitId") Long unitId) {
        return reportService.getTopSellersBySalesForMonth(unitId, 11, 2024);
    }

    @GetMapping("/get-top-selling-products/{unitId}")
    public List<TopSellingProductDto> getTopSellingProducts(@PathVariable("unitId") Long unitId) {
        return reportService.getTopSellingProducts(unitId);
    }

}
