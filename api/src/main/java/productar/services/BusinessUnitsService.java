package productar.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import productar.models.BusinessUnitsModel;
import productar.repositories.BusinessUnitsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class BusinessUnitsService {
    @Autowired
    BusinessUnitsRepository businessUnitsRepository;

    public Boolean BusinessExists(Long id) {
        Optional<BusinessUnitsModel> businessUnit = businessUnitsRepository.findById(id);
        return businessUnit.isPresent();
    }

    public ArrayList<BusinessUnitsModel> getAllBusinessUnit() {
        return (ArrayList<BusinessUnitsModel>) businessUnitsRepository.findAll();
    }

    public BusinessUnitsModel saveBusinessUnit(BusinessUnitsModel businessUnits) {
        return businessUnitsRepository.save(businessUnits);
    }

    public Optional<BusinessUnitsModel> getBusinessUnitById(Long id) {
        return businessUnitsRepository.findById(id);
    }

    public ResponseEntity<String> deleteBusinessUnitById(Long id) {
        Boolean businessExsits = this.BusinessExists(id);
        if (!businessExsits)
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Unidad de negocio no encontrada");

        try {
            businessUnitsRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Unidad de negocio eliminada");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

}
