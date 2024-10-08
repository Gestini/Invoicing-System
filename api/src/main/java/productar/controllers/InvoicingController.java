package productar.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.dto.InvoicingRequestDTO;
import productar.models.InvoicingModel;
import productar.services.InvoicingService;

@RestController
@RequestMapping("/invoicing")
public class InvoicingController {

    @Autowired
    private InvoicingService invoicingService;

    @PostMapping("/save")
    public ResponseEntity<?> saveInvoice(@RequestBody InvoicingRequestDTO data) {
        try {
            return invoicingService.saveInvoicing(data);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error: " + e.getMessage());
        }
    }

    @GetMapping("/get-all")
    public List<InvoicingModel> getAllInvoices() {
        return invoicingService.getAllInvoices();
    }

    @GetMapping(path = "/get/{id}")
    public Optional<InvoicingModel> getInvoiceById(@PathVariable("id") Long id) {
        return invoicingService.getInvoiceById(id);
    }

    @GetMapping(path = "/get-by-unit/{id}")
    public List<InvoicingModel> getInvoiceByUnit(@PathVariable("id") Long id) {
        return invoicingService.getByUnit(id);
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<?> deleteInvoiceById(@PathVariable("id") Long id) {
        return invoicingService.deleteInvoiceById(id);
    }

}
