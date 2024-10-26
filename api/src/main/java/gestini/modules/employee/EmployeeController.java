package gestini.modules.employee;

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
import gestini.modules.employee.dto.CreateEmployeeDto;
import gestini.modules.employee.models.EmployeeModel;
import gestini.utils.Permission;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/employee")
@SecurityRequirements({
        @SecurityRequirement(name = "BearerAuth"),
        @SecurityRequirement(name = "UnitAccess")
})
@CheckPermissions(Permission.MANAGE_HR)
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/create/{unitId}")
    public ResponseEntity<?> createEmployee(@PathVariable("unitId") Long unitId,
            @Valid @RequestBody CreateEmployeeDto employee) {
        return employeeService.createEmployee(unitId, employee);
    }

    @GetMapping("/get-by-unit/{unitId}")
    public ResponseEntity<?> getEmployeesByBusinessUnitId(@PathVariable("unitId") Long unitId) {
        return employeeService.getEmployeesByBusinessUnitId(unitId);
    }

    @GetMapping("/get-by-name/{unitId}/{name}")
    public List<EmployeeModel> searchEmployeeByName(@PathVariable("unitId") Long unitId,
            @PathVariable("name") String name) {
        return employeeService.searchEmployeeByName(unitId, name);
    }

    @DeleteMapping("/delete/{employeeId}")
    public ResponseEntity<String> deleteEmployeeById(@PathVariable("employeeId") Long employeeId) {
        return employeeService.deleteEmployee(employeeId);
    }

    @PutMapping("/edit/{employeeId}")
    public ResponseEntity<String> editEmployee(@PathVariable("employeeId") Long employeeId,
            @RequestBody EmployeeModel employee) {
        return employeeService.updateEmployee(employeeId, employee);
    }

    @DeleteMapping("/leave-unit/{unitId}")
    public ResponseEntity<String> leaveUnit(@PathVariable("unitId") Long unitId) {
        return employeeService.leaveUnit(unitId);
    }
}
