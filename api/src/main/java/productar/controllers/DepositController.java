package productar.controllers;

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

import productar.models.DepositModel;
import productar.services.DepositService;

@RestController
@RequestMapping("/deposit")
public class DepositController {

    @Autowired
    private DepositService depositUnitsService;

    @PostMapping("/create")
    public ResponseEntity<?> saveDepositUnit(@RequestBody DepositModel newDeposit) {
        return depositUnitsService.saveDeposit(newDeposit);
    }

    @PutMapping("/{depositId}")
    public ResponseEntity<?> updateDepositUnit(@PathVariable Long depositId, @RequestBody DepositModel data) {
        return depositUnitsService.updateDeposit(depositId, data);
    }

    @DeleteMapping("/{depositId}")
    public ResponseEntity<?> deleteDepositUnit(@PathVariable Long depositId) {
        return depositUnitsService.deleteDeposit(depositId);
    }

    @PostMapping("/assign-deposit-to-unit/{depositId}/{unitId}")
    public ResponseEntity<?> assignDepositToUnit(@PathVariable("depositId") Long depositId,
            @PathVariable("unitId") Long unitId) {
        return depositUnitsService.assignDepositToUnit(depositId, unitId);
    }

    @GetMapping("/get-by-unit-id/{unitId}")
    public ResponseEntity<?> getDepositsByUnitId(@PathVariable("unitId") Long unitId) {
        return depositUnitsService.getDepositsByUnitId(unitId);
    }

}
