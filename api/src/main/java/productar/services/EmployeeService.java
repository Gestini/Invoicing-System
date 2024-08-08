package productar.services;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import productar.models.EmployeeModel;
import productar.repositories.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public EmployeeModel createEmployee(EmployeeModel employee) {
        return employeeRepository.save(employee);
    }

    public List<EmployeeModel> getEmployeesByBusinessUnitId(Long id) {
        return employeeRepository.findByBusinessUnitId(id);
    }

    public List<EmployeeModel> searchEmployeeByName(Long unitId, String name) {
        return employeeRepository.searchEmployeeByName(unitId, name);
    }

    public ResponseEntity<String> deleteEmployee(Long id) {
        try {
            employeeRepository.deleteById(id);
            return ResponseEntity.ok("Empleado eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error: " + e.getMessage());
        }
    }

    public ResponseEntity<String> updateEmployee(Long id, EmployeeModel updatedEmployee) {
        try {
            Optional<EmployeeModel> existingRoleOptional = employeeRepository.findById(id);

            if (!existingRoleOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el empleado con ID: " + id);
            }

            EmployeeModel existingRole = existingRoleOptional.get();

            if (updatedEmployee == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Los datos a actualizar son nulos");
            }

            copyNonNullProperties(updatedEmployee, existingRole);
            employeeRepository.save(existingRole);
            return ResponseEntity.ok("Empleado actualizado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error: " + e.getMessage());
        }
    }

    private void copyNonNullProperties(EmployeeModel source, EmployeeModel target) {
        Field[] fields = EmployeeModel.class.getDeclaredFields();
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
