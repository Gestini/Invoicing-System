package productar.controllers;

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

import productar.models.EmployeeModel;
import productar.services.EmployeeService;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public EmployeeModel createEmployee(@RequestBody EmployeeModel employee) {
        return employeeService.createEmployee(employee);
    }

    @GetMapping("/get-by-unit/{id}")
    public List<EmployeeModel> getEmployeesByBusinessUnitId(@PathVariable("id") Long unitId) {
        return employeeService.getEmployeesByBusinessUnitId(unitId);
    }

    @GetMapping("/get-by-name/{name}")
    public List<EmployeeModel> searchEmployeeByName(@PathVariable("name") String name) {
        return employeeService.searchEmployeeByName(name);
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
}
