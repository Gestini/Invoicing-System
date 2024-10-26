package gestini.modules.businessUnit;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.businessUnit.repositories.BusinessUnitsRepository;
import gestini.modules.employee.models.EmployeeModel;
import gestini.modules.employee.repositories.EmployeeRepository;
import gestini.modules.user.models.User;

@Service
public class BusinessUnitService {
    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Value("${secretKeyPlan}")
    private String SECRET_KEY_PLAN;

    public Boolean BusinessExists(Long id) {
        Optional<BusinessUnitModel> businessUnit = businessUnitsRepository.findById(id);
        return businessUnit.isPresent();
    }

    public List<BusinessUnitModel> getAllBusinessUnit() {
        return businessUnitsRepository.findAll();
    }

    public List<BusinessUnitModel> findAllUnitsWithEcommerce() {
        return businessUnitsRepository.findAllUnitsWithEcommerce();
    }

    public BusinessUnitModel findByUnitIdAndEcommerce(Long unitId) {
        return businessUnitsRepository.findByUnitIdAndEcommerce(unitId);
    }

    public ResponseEntity<?> getUnitsMissingDeposit(Long companyId, Long depositId) {
        try {
            List<BusinessUnitModel> result = businessUnitsRepository.getUnitsMissingDeposit(companyId,
                    depositId);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error inesperado");
        }
    }

    public ResponseEntity<?> getUnitsWithDeposit(Long companyId, Long depositId) {
        try {
            List<BusinessUnitModel> result = businessUnitsRepository.getUnitsWithDeposit(companyId,
                    depositId);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error inesperado");
        }
    }

    public ResponseEntity<?> searchUnitsMissingDeposit(Long companyId, Long depositId, String searchValue) {
        try {
            List<BusinessUnitModel> result = businessUnitsRepository.searchUnitsMissingDeposit(companyId,
                    depositId, searchValue);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error inesperado");
        }
    }

    public List<BusinessUnitModel> findUnitsByCompanyId(Long companyId) {
        return businessUnitsRepository.findUnitsByCompanyId(companyId);
    }

    public List<BusinessUnitModel> findBusinessUnitsByCompanyIdAndWithUserAsOwnerOrEmployee(Long companyId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        return businessUnitsRepository.findBusinessUnitsByCompanyIdAndWithUserAsOwnerOrEmployee(companyId,
                user.getId());
    }

    public List<BusinessUnitModel> getBusinessUnitsByToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();

        // Buscar las unidades de negocio asociadas al usuario
        List<BusinessUnitModel> businessUnits = businessUnitsRepository.findByOwnerUsername(username);

        return businessUnits;
    }

    public List<BusinessUnitModel> getUserBusinessUnits() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();

        // Obtener unidades donde el usuario es dueño
        List<BusinessUnitModel> ownedUnits = businessUnitsRepository.findByOwnerUsername(username);

        // Obtener unidades donde el usuario es empleado
        List<BusinessUnitModel> employeeUnits = employeeRepository.findByUserUsername(username)
                .stream()
                .map(EmployeeModel::getBusinessUnit)
                .collect(Collectors.toList());

        // Combinar y eliminar duplicados
        ownedUnits.addAll(employeeUnits);

        return ownedUnits.stream().distinct().collect(Collectors.toList());
    }

    public ResponseEntity<BusinessUnitModel> saveBusinessUnit(BusinessUnitModel businessUnit) {

        BusinessUnitModel savedBusinessUnit = businessUnitsRepository.save(businessUnit);

        return ResponseEntity.status(HttpStatus.OK).body(savedBusinessUnit);
    }

    public ResponseEntity<?> getBusinessUnitById(Long id) {
        try {
            Optional<BusinessUnitModel> unit = businessUnitsRepository.findById(id);

            if (!unit.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unidad de negocio no encontrada");
            }

            return ResponseEntity.ok(unit);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

    public ResponseEntity<String> deleteBusinessUnitById(Long id) {
        BusinessUnitModel businessUnit = businessUnitsRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Unidad de negocio no encontrada"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        User owner = businessUnit.getCompany().getOwner();

        if (!owner.getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Solo el dueño puede eliminar la unidad");
        }

        try {
            businessUnitsRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Unidad de negocio eliminada");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> updateBusinessUnit(Long id, BusinessUnitModel updatedData) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = ((UserDetails) authentication.getPrincipal()).getUsername();

            BusinessUnitModel businessUnit = businessUnitsRepository.findById(id)
                    .orElseThrow(() -> new UsernameNotFoundException("Unidad de negocio no encontrada"));

            User owner = businessUnit.getCompany().getOwner();
            if (!owner.getUsername().equals(username)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            copyNonNullProperties(updatedData, businessUnit);

            businessUnitsRepository.save(businessUnit);

            return ResponseEntity.ok("Unidad actualizada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    private void copyNonNullProperties(BusinessUnitModel source, BusinessUnitModel target) {
        Field[] fields = BusinessUnitModel.class.getDeclaredFields();
        for (Field field : fields) {
            try {
                field.setAccessible(true);
                Object value = field.get(source);
                if (value != null) {
                    field.set(target, value);
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

}
