package gestini.modules.invoicing;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gestini.annotations.CheckPermissions;
import gestini.modules.invoicing.dto.InvoicingRequestDto;
import gestini.modules.invoicing.models.InvoicingModel;
import gestini.utils.Permission;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;

@RestController
@RequestMapping("/invoicing")
@SecurityRequirements({
        @SecurityRequirement(name = "BearerAuth"),
        @SecurityRequirement(name = "UnitAccess")
})
@CheckPermissions(Permission.MANAGE_OPERATIONS)
public class InvoicingController {

    @Autowired
    private InvoicingService invoicingService;

    @PostMapping("/save")
    public ResponseEntity<?> saveInvoice(@RequestBody InvoicingRequestDto data) {
        return invoicingService.saveInvoicing(data);
    }

    @GetMapping("/get-all")
    public List<InvoicingModel> getAllInvoices() {
        return invoicingService.getAllInvoices();
    }

    @GetMapping("/get/{id}")
    public Optional<InvoicingModel> getInvoiceById(@PathVariable("id") Long id) {
        return invoicingService.getInvoiceById(id);
    }

    @GetMapping("/get-by-unit/{id}")
    public List<InvoicingModel> getInvoiceByUnit(@PathVariable("id") Long id) {
        return invoicingService.getByUnit(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteInvoiceById(@PathVariable("id") Long id) {
        return invoicingService.deleteInvoiceById(id);
    }

}
