package productar.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import productar.services.BusinessUnitsService;
import productar.models.BusinessUnitsModel;

@RestController
@RequestMapping("/business-unit")
public class BusinessUnitsController {

    @Autowired
    private BusinessUnitsService businessUnitsService;

    @PostMapping("/save")
    public BusinessUnitsModel saveBusinessUnit(@RequestBody BusinessUnitsModel businessUnit) {
        System.out.println(businessUnit);
        return this.businessUnitsService.saveBusinessUnit(businessUnit);
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

    /*  */
}
