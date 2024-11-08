package gestini.modules.discount;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.businessUnit.repositories.BusinessUnitsRepository;
import gestini.modules.discount.dto.CreateDiscountDto;
import gestini.modules.discount.dto.EditDiscountDto;
import gestini.modules.discount.models.DiscountModel;
import gestini.modules.discount.repositories.DiscountRepository;

@Service
public class DiscountService {
    @Autowired
    private DiscountRepository discountRepository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    ResponseEntity<?> createDiscount(Long unitId, CreateDiscountDto newDiscountDto) {
        try {
            Optional<BusinessUnitModel> optionalUnit = businessUnitsRepository.findById(unitId);
            if (!optionalUnit.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unidad no encontrada");
            }

            BusinessUnitModel unit = optionalUnit.get();

            DiscountModel newDiscountModel = new DiscountModel();

            String uniqueCode = generateUniqueCode();

            newDiscountModel.setCode(uniqueCode);
            newDiscountModel.setBusinessUnit(unit);
            newDiscountModel.setType(newDiscountDto.getType());
            newDiscountModel.setValue(newDiscountDto.getValue());
            newDiscountModel.setMaxUsages(newDiscountDto.getMaxUsages());

            DiscountModel savedDiscount = discountRepository.save(newDiscountModel);
            return ResponseEntity.ok(savedDiscount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    ResponseEntity<?> findDiscountByCode(String code) {
        try {
            Optional<DiscountModel> discountOptional = discountRepository.findDiscountByCode(code);
            if (!discountOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Descuento no encontrado");
            }

            DiscountModel discount = discountOptional.get();
            return ResponseEntity.ok(discount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    ResponseEntity<?> editDiscount(Long discountId, EditDiscountDto body) {
        try {
            Optional<DiscountModel> discountOptional = discountRepository.findById(discountId);
            if (!discountOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Descuento no encontrado");
            }

            DiscountModel discount = discountOptional.get();

            if (body.getDescription() != null) {
                discount.setDescription(body.getDescription());
            }

            if (body.getMaxUsages() != null) {
                discount.setMaxUsages(body.getMaxUsages());
            }

            if (body.getType() != null) {
                discount.setType(body.getType());
            }

            if (body.getValue() != null) {
                discount.setValue(body.getValue());
            }

            DiscountModel savedDiscount = discountRepository.save(discount);
            return ResponseEntity.ok(savedDiscount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> findAllDiscountsByUnitId(Long unitId) {
        try {
            Optional<BusinessUnitModel> unitOptional = businessUnitsRepository.findById(unitId);
            if (!unitOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unidad no encontrada");
            }

            List<DiscountModel> discounts = discountRepository.findAllDiscountsByUnitId(unitId);
            return ResponseEntity.ok(discounts);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> deleteDiscountById(Long discountId) {
        try {
            discountRepository.deleteById(discountId);
            return ResponseEntity.ok("Descuento eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    private String generateUniqueCode() {
        return "DSC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

}
