package gestini.modules.businessUnit;

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

import gestini.modules.businessUnit.models.BusinessUnitModel;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/business-unit")
@SecurityRequirement(name = "BearerAuth")
public class BusinessUnitController {

    @Autowired
    private BusinessUnitService businessUnitsService;

    @PostMapping("/save")
    public ResponseEntity<BusinessUnitModel> saveBusinessUnit(@RequestBody BusinessUnitModel data) {
        return this.businessUnitsService.saveBusinessUnit(data);
    }

    @GetMapping("/get-all")
    public List<BusinessUnitModel> getAllBusinessUnit() {
        return this.businessUnitsService.getAllBusinessUnit();
    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<?> getBusinessUnitById(@PathVariable("id") Long id) {
        return this.businessUnitsService.getBusinessUnitById(id);
    }

    @GetMapping("/get-all-ecommerce")
    public List<BusinessUnitModel> findAllUnitsWithEcommerce() {
        return this.businessUnitsService.findAllUnitsWithEcommerce();
    }

    @GetMapping("/get-by-id-and-ecommerce/{unitId}")
    public BusinessUnitModel findByUnitIdAndEcommerce(@PathVariable("unitId") Long unitId) {
        return this.businessUnitsService.findByUnitIdAndEcommerce(unitId);
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteBusinessUnitById(@PathVariable("id") Long id) {
        return this.businessUnitsService.deleteBusinessUnitById(id);
    }

    @GetMapping("/get-by-owner")
    public List<BusinessUnitModel> getBusinessUnitsByOwner() {
        return this.businessUnitsService.getUserBusinessUnits();
    }

    @GetMapping("/get-by-company-id/{companyId}")
    public List<BusinessUnitModel> findUnitsByCompanyId(@PathVariable Long companyId) {
        return this.businessUnitsService.findUnitsByCompanyId(companyId);
    }

    @GetMapping("/find-business-units-by-company-id-and-with-user-as-owner-or-employee/{companyId}")
    public List<BusinessUnitModel> findBusinessUnitsByCompanyIdAndWithUserAsOwnerOrEmployee(
            @PathVariable Long companyId) {
        return this.businessUnitsService.findBusinessUnitsByCompanyIdAndWithUserAsOwnerOrEmployee(companyId);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBusinessUnit(
            @PathVariable("id") Long id, @RequestBody BusinessUnitModel data) {
        return this.businessUnitsService.updateBusinessUnit(id, data);
    }

    @GetMapping("/get-units-missing-deposit/{companyId}/{depositId}")
    public ResponseEntity<?> getUnitsMissingDeposit(@PathVariable("companyId") Long companyId,
            @PathVariable("depositId") Long depositId) {
        return this.businessUnitsService.getUnitsMissingDeposit(companyId, depositId);
    }

    @GetMapping("/get-units-with-deposit/{companyId}/{depositId}")
    public ResponseEntity<?> getUnitsWithDeposit(@PathVariable("companyId") Long companyId,
            @PathVariable("depositId") Long depositId) {
        return this.businessUnitsService.getUnitsWithDeposit(companyId, depositId);
    }

    @GetMapping("/search-units-missing-deposit/{companyId}/{depositId}/{searchValue}")
    public ResponseEntity<?> searchUnitsMissingDeposit(@PathVariable("companyId") Long companyId,
            @PathVariable("depositId") Long depositId, @PathVariable("searchValue") String searchValue) {
        return this.businessUnitsService.searchUnitsMissingDeposit(companyId, depositId, searchValue);
    }

}
