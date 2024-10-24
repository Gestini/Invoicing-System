package gestini.modules.supplier;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.businessUnit.repositories.BusinessUnitsRepository;
import gestini.modules.supplier.dto.SupplierDto;
import gestini.modules.supplier.models.SupplierModel;
import gestini.modules.supplier.repositories.SupplierRepository;
import jakarta.transaction.Transactional;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    public ResponseEntity<?> createSupplier(SupplierDto supplier, Long unitId) {
        try {
            Optional<BusinessUnitModel> optionalUnit = businessUnitsRepository.findById(unitId);

            if (!optionalUnit.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unidad no encontrada");
            }

            SupplierModel newSupplier = new SupplierModel();
            newSupplier.setBusinessUnit(optionalUnit.get());
            newSupplier.setName(supplier.getName());
            newSupplier.setDescription(supplier.getDescription());
            newSupplier.setPhone(supplier.getPhone());
            newSupplier.setEmail(supplier.getEmail());
            newSupplier.setWebsite(supplier.getWebsite());
            newSupplier.setSupplierType(supplier.getSupplierType());
            newSupplier.setReasonSocial(supplier.getReasonSocial());
            newSupplier.setAddress(supplier.getAddress());
            newSupplier.setDni(supplier.getDni());
            newSupplier.setSaleCondition(supplier.getSaleCondition());

            SupplierModel savedSupplier = supplierRepository.save(newSupplier);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSupplier);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> getSupplierById(Long id) {
        try {
            Optional<SupplierModel> supplier = supplierRepository.findById(id);
            if (!supplier.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Proveedor no encontrado");
            }

            return ResponseEntity.ok(supplier);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> deleteSupplier(Long id) {
        try {
            Optional<SupplierModel> supplier = supplierRepository.findById(id);
            if (!supplier.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Proveedor no encontrado");
            }

            supplierRepository.deleteById(id);
            return ResponseEntity.ok("Proveedor eliminado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public List<SupplierModel> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public List<SupplierModel> findSuppliersByName(String name) {
        return supplierRepository.findByNameContainingIgnoreCase(name);
    }

    public ResponseEntity<?> getSuppliersByBusinessUnit(Long businessUnitId) {
        try {
            Optional<BusinessUnitModel> optionalUnit = businessUnitsRepository.findById(businessUnitId);

            if (!optionalUnit.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unidad no encontrada");
            }

            List<SupplierModel> suppliers = supplierRepository.findByBusinessUnitId(businessUnitId);
            return ResponseEntity.ok(suppliers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    @Transactional
    public ResponseEntity<?> updateSupplier(Long id, SupplierDto supplierDto) {
        try {
            // Buscar el proveedor existente por ID
            Optional<SupplierModel> existingSupplierOptional = supplierRepository.findById(id);

            // Validar si el proveedor existe
            if (!existingSupplierOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Proveedor no encontrado");
            }

            // Crear una instancia del proveedor existente
            SupplierModel existingSupplier = existingSupplierOptional.get();

            // Actualizar solo las propiedades que no sean nulas del DTO
            if (supplierDto.getName() != null) {
                existingSupplier.setName(supplierDto.getName());
            }
            if (supplierDto.getDescription() != null) {
                existingSupplier.setDescription(supplierDto.getDescription());
            }
            if (supplierDto.getPhone() != null) {
                existingSupplier.setPhone(supplierDto.getPhone());
            }
            if (supplierDto.getEmail() != null) {
                existingSupplier.setEmail(supplierDto.getEmail());
            }
            if (supplierDto.getWebsite() != null) {
                existingSupplier.setWebsite(supplierDto.getWebsite());
            }
            if (supplierDto.getSupplierType() != null) {
                existingSupplier.setSupplierType(supplierDto.getSupplierType());
            }
            if (supplierDto.getReasonSocial() != null) {
                existingSupplier.setReasonSocial(supplierDto.getReasonSocial());
            }
            if (supplierDto.getAddress() != null) {
                existingSupplier.setAddress(supplierDto.getAddress());
            }
            if (supplierDto.getDni() != null) {
                existingSupplier.setDni(supplierDto.getDni());
            }
            if (supplierDto.getSaleCondition() != null) {
                existingSupplier.setSaleCondition(supplierDto.getSaleCondition());
            }

            // Guardar el proveedor actualizado en la base de datos
            SupplierModel updatedSupplier = supplierRepository.save(existingSupplier);
            return ResponseEntity.ok(updatedSupplier);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error: " + e.getMessage());
        }
    }

}
