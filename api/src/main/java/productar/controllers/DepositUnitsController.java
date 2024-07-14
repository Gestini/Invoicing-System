package productar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import productar.models.DepositUnitsModel;
import productar.services.DepositUnitsService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/deposit")
public class DepositUnitsController {

    @Autowired
    private DepositUnitsService depositUnitsService;

    @PostMapping("/save")
    public ResponseEntity<DepositUnitsModel> saveDepositUnit(@RequestBody DepositUnitsModel depositUnit,
            Authentication authentication) {
        return depositUnitsService.saveDepositUnit(depositUnit, authentication.getName());
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

    @GetMapping("/by-owner")
    public ResponseEntity<List<Map<String, Object>>> getDepositUnitsByOwner() {
        List<Map<String, Object>> depositUnits = depositUnitsService.getDepositUnitsByOwner();
        return ResponseEntity.ok(depositUnits);
    }
}
