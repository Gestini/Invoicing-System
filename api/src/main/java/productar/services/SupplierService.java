package productar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import productar.dto.SupplierDTO;
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
            Field[] fields = SupplierModel.class.getDeclaredFields();

            for (Field field : fields) {
                field.setAccessible(true);
                try {
                    Object value = field.get(supplier);
                    if (value != null) {
                        field.set(existingSupplier, value);
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }

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

    public List<SupplierDTO> getSuppliersByBusinessUnit(Long businessUnitId) {
        return supplierRepository.findByBusinessUnitId(businessUnitId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private SupplierDTO convertToDTO(SupplierModel supplier) {
        SupplierDTO dto = new SupplierDTO();
        dto.setId(supplier.getId());
        dto.setName(supplier.getName());
        dto.setDescription(supplier.getDescription());
        dto.setPhone(supplier.getPhone());
        dto.setEmail(supplier.getEmail());
        dto.setWebsite(supplier.getWebsite());
        dto.setSupplierType(supplier.getSupplierType());
        dto.setReasonSocial(supplier.getReasonSocial());
        dto.setAddress(supplier.getAddress());
        dto.setDni(supplier.getDni());
        dto.setSaleCondition(supplier.getSaleCondition());
        dto.setBusinessUnitId(supplier.getBusinessUnit().getId());
        return dto;
    }
}
