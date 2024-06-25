package productar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import productar.models.BusinessUnitsModel;
import productar.models.SupplierModel;
import productar.repositories.SupplierRepository;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public SupplierModel createSupplier(SupplierModel supplier, BusinessUnitsModel businessUnit) {
        supplier.setBusinessUnit(businessUnit);
        return supplierRepository.save(supplier);
    }

    public SupplierModel updateSupplier(Long id, SupplierModel supplier) {
        Optional<SupplierModel> existingSupplierOptional = supplierRepository.findById(id);
        if (existingSupplierOptional.isPresent()) {
            SupplierModel existingSupplier = existingSupplierOptional.get();
            // Actualizar solo los campos relevantes
            existingSupplier.setName(supplier.getName());
            existingSupplier.setDescription(supplier.getDescription());
            existingSupplier.setPhone(supplier.getPhone());
            existingSupplier.setAddress(supplier.getAddress());
            existingSupplier.setEmail(supplier.getEmail());
            existingSupplier.setWebsite(supplier.getWebsite());
            existingSupplier.setSupplierType(supplier.getSupplierType());
            existingSupplier.setDni(supplier.getDni());
            existingSupplier.setReasonSocial(supplier.getReasonSocial());
            existingSupplier.setSaleCondition(supplier.getSaleCondition());

            return supplierRepository.save(existingSupplier);
        } else {
            return null;
        }
    }

    public void deleteSupplier(Long id) {
        supplierRepository.deleteById(id);
    }

    public SupplierModel getSupplierById(Long id) {
        return supplierRepository.findById(id).orElse(null);
    }

    public List<SupplierModel> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public List<SupplierModel> findSuppliersByName(String name) {
        return supplierRepository.findByNameContainingIgnoreCase(name);
    }

    public List<SupplierModel> getSuppliersByBusinessUnit(Long businessUnitId) {
        return supplierRepository.findByBusinessUnitId(businessUnitId);
    }
}
