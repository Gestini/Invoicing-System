package productar.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import productar.models.BusinessUnitDepositModel;
import productar.models.BusinessUnitModel;
import productar.models.CompanyModel;
import productar.models.DepositModel;
import productar.repositories.BusinessUnitsDepositRespository;
import productar.repositories.BusinessUnitsRepository;
import productar.repositories.CompanyRepository;
import productar.repositories.DepositRepository;

@Service
public class DepositService {

    @Autowired
    private DepositRepository depositRepository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    @Autowired
    private BusinessUnitsDepositRespository businessUnitsDepositRespository;

    @Autowired
    private CompanyRepository companyRepository;

    public ResponseEntity<?> saveDeposit(DepositModel newDeposit) {
        try {
            return ResponseEntity.ok(depositRepository.save(newDeposit));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrio un error " + e.getMessage());
        }
    }

    public Optional<DepositModel> getDepositById(Long id) {
        return depositRepository.findById(id);
    }

    public ResponseEntity<?> updateDeposit(Long depositId, DepositModel data) {
        try {
            DepositModel deposit = this.depositRepository.findById(depositId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Depósito no encontrada"));

            deposit.setName(data.getName());
            depositRepository.save(deposit);

            return ResponseEntity.ok("Depósito actualizado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> deleteDeposit(Long depositId) {
        try {
            Optional<DepositModel> deposit = this.depositRepository.findById(depositId);

            if (!deposit.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Deposito no encontrado");
            }

            depositRepository.deleteById(depositId);
            return ResponseEntity.ok("Depósito eliminado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> assignDepositToUnit(Long depositId, Long unitId) {
        try {
            DepositModel deposit = this.depositRepository.findById(depositId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Depósito no encontrada"));

            BusinessUnitModel unit = this.businessUnitsRepository.findById(unitId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unidad no encontrada"));

            if (businessUnitsDepositRespository.isAssigned(unitId, depositId)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El depósito ya está asignado a la unidad");
            }

            BusinessUnitDepositModel businessUnitDeposit = new BusinessUnitDepositModel();

            businessUnitDeposit.setBusinessUnit(unit);
            businessUnitDeposit.setDeposit(deposit);

            businessUnitsDepositRespository.save(businessUnitDeposit);

            return ResponseEntity.ok("Depósito asignado correctamente a la unidad");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error " + e.getMessage());
        }
    }

    public ResponseEntity<?> unlinkDepositFromUnit(Long depositId, Long unitId) {
        try {

            Optional<DepositModel> optionalDeposit = depositRepository.findById(depositId);
            if (!optionalDeposit.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Depósito no encontrado");
            }

            Optional<BusinessUnitModel> optionalUnit = businessUnitsRepository.findById(unitId);
            if (!optionalUnit.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unidad no encontrada");
            }

            if (!businessUnitsDepositRespository.isAssigned(unitId, depositId)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El depósito no está asignado a la unidad");
            }

            businessUnitsDepositRespository.unlinkDepositFromUnit(unitId, depositId);

            return ResponseEntity.ok("Depósito desvinculado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> getDepositsByUnitId(Long unitId) {
        try {
            List<DepositModel> deposits = businessUnitsDepositRespository
                    .getDepositsByUnitId(unitId)
                    .stream()
                    .map(businessUnitDeposit -> businessUnitDeposit.getDeposit())
                    .collect(Collectors.toList());

            return ResponseEntity.ok(deposits);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> getDepositsByCompanyId(Long companyId) {
        try {
            Optional<CompanyModel> company = companyRepository.findById(companyId);
            if (!company.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Compañía no encontrada");
            }

            List<DepositModel> depositos = depositRepository.findDepositsByCompanyId(companyId);

            return ResponseEntity.ok(depositos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }
}
