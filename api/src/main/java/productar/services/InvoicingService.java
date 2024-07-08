package productar.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import productar.models.InvoicingModel;
import productar.repositories.InvoicingRepository;

@Service
public class InvoicingService {
    @Autowired
    InvoicingRepository invoicingRepository;

    public Boolean InvoicingExists(Long id) {
        Optional<InvoicingModel> invoicing = invoicingRepository.findById(id);
        return invoicing.isPresent();
    }

    public ArrayList<InvoicingModel> getAllInvoices() {
        return (ArrayList<InvoicingModel>) invoicingRepository.findAll();
    }

    public ResponseEntity<InvoicingModel> saveInvoicing(InvoicingModel invoicing) {
        System.out.println(invoicing);
        InvoicingModel saved = invoicingRepository.save(invoicing);
        return ResponseEntity.status(HttpStatus.OK).body(saved);
    }

    public Optional<InvoicingModel> getInvoiceById(Long id) {
        return invoicingRepository.findById(id);
    }

    public List<InvoicingModel> getByUnit(Long id) {
        return invoicingRepository.findByBusinessUnitId(id);
    }

    public ResponseEntity<String> deleteInvoiceById(Long id) {
        try {
            invoicingRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Factura eliminada correctamente");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

}
