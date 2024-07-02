package productar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import productar.dto.SupplierDTO;
import productar.models.BusinessUnitsModel;
import productar.models.SupplierModel;
import productar.services.SupplierService;

import java.util.List;

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

        BusinessUnitsModel businessUnit = new BusinessUnitsModel();
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
