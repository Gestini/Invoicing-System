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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;

import productar.models.BusinessUnitsModel;
import productar.services.BusinessUnitsService;

@RestController
@RequestMapping("/business-unit")
public class BusinessUnitsController {

    @Autowired
    private BusinessUnitsService businessUnitsService;

    @PostMapping("/save")
    public ResponseEntity<BusinessUnitsModel> saveBusinessUnit(@RequestBody BusinessUnitsModel data,
            Authentication authentication) {
        return this.businessUnitsService.saveBusinessUnit(data, authentication.getName());
    }

    @GetMapping("/get-all")
    public ArrayList<BusinessUnitsModel> getAllBusinessUnit() {
        return this.businessUnitsService.getAllBusinessUnit();
    }

    @GetMapping(path = "/get/{id}")
    public Optional<BusinessUnitsModel> getBusinessUnitById(@PathVariable("id") Long id) {
        return this.businessUnitsService.getBusinessUnitById(id);
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteBusinessUnitById(@PathVariable("id") Long id) {
        return this.businessUnitsService.deleteBusinessUnitById(id);
    }

    @GetMapping("/get-by-owner")
    public List<BusinessUnitsModel> getBusinessUnitsByOwner() {
        return this.businessUnitsService.getUserBusinessUnits();
    }

    @PostMapping("/assign-plan/{token}")
    public ResponseEntity<?> assingPlan(@PathVariable("token") String token) {
        return this.businessUnitsService.assingPlan(token);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BusinessUnitsModel> updateBusinessUnit(
            @PathVariable("id") Long id,
            @RequestBody BusinessUnitsModel data,
            Authentication authentication) {
        return this.businessUnitsService.updateBusinessUnit(id, data, authentication.getName());
    }
}
