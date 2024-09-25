package productar.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.models.BusinessUnitModel;
import productar.services.BusinessUnitService;

@RestController
@RequestMapping("/business-unit")
public class BusinessUnitController {

    @Autowired
    private BusinessUnitService businessUnitsService;

    @PostMapping("/save")
    public ResponseEntity<BusinessUnitModel> saveBusinessUnit(@RequestBody BusinessUnitModel data,
            Authentication authentication) {
        return this.businessUnitsService.saveBusinessUnit(data, authentication.getName());
    }

    @GetMapping("/get-all")
    public ArrayList<BusinessUnitModel> getAllBusinessUnit() {
        return this.businessUnitsService.getAllBusinessUnit();
    }

    @GetMapping(path = "/get/{id}")
    public Optional<BusinessUnitModel> getBusinessUnitById(@PathVariable("id") Long id) {
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

    @PostMapping("/assign-plan/{token}")
    public ResponseEntity<?> assingPlan(@PathVariable("token") String token) {
        return this.businessUnitsService.assingPlan(token);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBusinessUnit(
            @PathVariable("id") Long id, @RequestBody BusinessUnitModel data) {
        return this.businessUnitsService.updateBusinessUnit(id, data);
    }

}
