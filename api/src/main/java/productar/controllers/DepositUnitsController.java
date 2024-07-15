package productar.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.models.DepositUnitsModel;
import productar.services.DepositUnitsService;

@RestController
@RequestMapping("/deposit")
public class DepositUnitsController {

    @Autowired
    private DepositUnitsService depositUnitsService;

    @PostMapping("/save")
    public DepositUnitsModel saveDepositUnit(@RequestBody DepositUnitsModel depositUnit) {
        return depositUnitsService.saveDepositUnit(depositUnit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepositUnitsModel> updateDepositUnit(@PathVariable Long id,
            @RequestBody DepositUnitsModel depositUnitDetails) {
        Optional<DepositUnitsModel> depositUnitOptional = depositUnitsService.getDepositUnitById(id);
        if (!depositUnitOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        DepositUnitsModel depositUnit = depositUnitOptional.get();
        depositUnit.setName(depositUnitDetails.getName());
        DepositUnitsModel updatedDepositUnit = depositUnitsService.updateDepositUnit(depositUnit);
        return new ResponseEntity<>(updatedDepositUnit, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepositUnit(@PathVariable Long id) {
        Optional<DepositUnitsModel> depositUnitOptional = depositUnitsService.getDepositUnitById(id);
        if (!depositUnitOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        depositUnitsService.deleteDepositUnit(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public List<DepositUnitsModel> getDepositsByBusisnessUnitId(@PathVariable Long id) {
        return depositUnitsService.findByBusinessUnitId(id);
    }
}
