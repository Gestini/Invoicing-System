package productar.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import productar.models.InvoicingModel;
import productar.models.ProductInvoicingModel;
import productar.models.ProductModel;
import productar.repositories.InvoicingRepository;
import productar.repositories.ProductRepository;

@Service
public class InvoicingService {

    @Autowired
    private InvoicingRepository invoicingRepository;

    @Autowired
    private ProductRepository productRepository;

    public Boolean InvoicingExists(Long id) {
        Optional<InvoicingModel> invoicing = invoicingRepository.findById(id);
        return invoicing.isPresent();
    }

    public ArrayList<InvoicingModel> getAllInvoices() {
        return (ArrayList<InvoicingModel>) invoicingRepository.findAll();
    }

    public ResponseEntity<String> saveInvoicing(InvoicingModel invoicing) {
        try {
            /* Lista de productos */
            List<ProductInvoicingModel> products = invoicing.getProducts();

            /* Recorremos la lista de productos */
            for (ProductInvoicingModel productInvoicing : products) {

                /* Buscamos el producto por su id */
                Optional<ProductModel> existingProductOptional = productRepository.findById(productInvoicing.getId());
                if (!existingProductOptional.isPresent())
                    throw new EntityNotFoundException("No se encontró el producto");

                ProductModel existingProduct = existingProductOptional.get();
                if (existingProduct.getQuantity() < productInvoicing.getQuantity())
                    throw new EntityNotFoundException("No hay suficiente cantidad en stock");

                /* Actualizamos el stock del producto */
                existingProduct.setQuantity(existingProduct.getQuantity() - productInvoicing.getQuantity());
                productInvoicing.setInvoice(invoicing);
                productRepository.save(existingProduct);
            }

            /* Limpiamos el arreglo de productos */
            invoicing.setProducts(new ArrayList<>());
            
            /* Guardamos la factura */
            invoicingRepository.save(invoicing);

            return ResponseEntity.status(HttpStatus.OK).body("Factura guardada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error" + e);
        }
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
