package gestini.modules.supplier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gestini.annotations.CheckPermissions;
import gestini.modules.supplier.dto.SupplierDto;
import gestini.modules.supplier.models.SupplierModel;
import gestini.utils.Permission;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/supplier")
@SecurityRequirements({
        @SecurityRequirement(name = "BearerAuth"),
        @SecurityRequirement(name = "UnitAccess")
})
@CheckPermissions(Permission.MANAGE_STOCK)
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping
    public List<SupplierModel> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }

    @PostMapping("/create/{unitId}")
    public ResponseEntity<?> createSupplier(@PathVariable Long unitId, @Valid @RequestBody SupplierDto supplier) {
        return supplierService.createSupplier(supplier, unitId);
    }

    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<?> getSupplierById(@PathVariable("id") Long id) {
        return supplierService.getSupplierById(id);
    }

    @GetMapping("/by-business-unit/{unitId}")
    public ResponseEntity<?> getSuppliersByBusinessUnit(@PathVariable Long unitId) {
        return supplierService.getSuppliersByBusinessUnit(unitId);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateSupplier(@PathVariable("id") Long id, @Valid @RequestBody SupplierDto supplier) {
        return supplierService.updateSupplier(id, supplier);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSupplier(@PathVariable("id") Long id) {
        return supplierService.deleteSupplier(id);
    }
}
