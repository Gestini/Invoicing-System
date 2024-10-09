package productar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.dto.SupplierDTO;
import productar.models.BusinessUnitModel;
import productar.models.SupplierModel;
import productar.services.SupplierService;

@RestController
@RequestMapping("/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    @Autowired
    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping
    public ResponseEntity<List<SupplierModel>> getAllSuppliers() {
        List<SupplierModel> suppliers = supplierService.getAllSuppliers();
        return ResponseEntity.ok(suppliers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierModel> getSupplierById(@PathVariable("id") Long id) {
        SupplierModel supplier = supplierService.getSupplierById(id);
        if (supplier != null) {
            return ResponseEntity.ok(supplier);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/by-business-unit/{businessUnitId}")
    public List<SupplierDTO> getSuppliersByBusinessUnit(@PathVariable Long businessUnitId) {
        return supplierService.getSuppliersByBusinessUnit(businessUnitId);
    }

    @PostMapping
    public ResponseEntity<SupplierModel> createSupplier(@RequestBody SupplierModel supplier) {
        if (supplier.getBusinessUnit() == null || supplier.getBusinessUnit().getId() == null) {
            // Manejo de error si businessUnitId no está presente en el objeto SupplierModel
            return ResponseEntity.badRequest().build();
        }

        BusinessUnitModel businessUnit = new BusinessUnitModel();
        businessUnit.setId(supplier.getBusinessUnit().getId());

        SupplierModel createdSupplier = supplierService.createSupplier(supplier, businessUnit);
        return new ResponseEntity<>(createdSupplier, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierModel> updateSupplier(@PathVariable("id") Long id,
            @RequestBody SupplierModel supplier) {
        SupplierModel updatedSupplier = supplierService.updateSupplier(id, supplier);
        return ResponseEntity.ok(updatedSupplier);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSupplier(@PathVariable("id") Long id) {
        supplierService.deleteSupplier(id);
        return ResponseEntity.noContent().build();
    }
}
