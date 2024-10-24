package gestini.modules.deposit;

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

import gestini.modules.deposit.models.DepositModel;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/deposit")
@SecurityRequirement(name = "BearerAuth")
public class DepositController {

    @Autowired
    private DepositService depositService;

    @PostMapping("/create")
    public ResponseEntity<?> saveDepositUnit(@RequestBody DepositModel newDeposit) {
        return depositService.saveDeposit(newDeposit);
    }

    @PutMapping("/{depositId}")
    public ResponseEntity<?> updateDepositUnit(@PathVariable Long depositId, @RequestBody DepositModel data) {
        return depositService.updateDeposit(depositId, data);
    }

    @DeleteMapping("/{depositId}")
    public ResponseEntity<?> deleteDepositUnit(@PathVariable Long depositId) {
        return depositService.deleteDeposit(depositId);
    }

    @PostMapping("/assign-deposit-to-unit/{depositId}/{unitId}")
    public ResponseEntity<?> assignDepositToUnit(@PathVariable("depositId") Long depositId,
            @PathVariable("unitId") Long unitId) {
        return depositService.assignDepositToUnit(depositId, unitId);
    }

    @GetMapping("/get-by-unit-id/{unitId}")
    public ResponseEntity<?> getDepositsByUnitId(@PathVariable("unitId") Long unitId) {
        return depositService.getDepositsByUnitId(unitId);
    }

    @GetMapping("/get-by-company-id/{companyId}")
    public ResponseEntity<?> getDepositsByCompanyId(@PathVariable("companyId") Long companyId) {
        return depositService.getDepositsByCompanyId(companyId);
    }

    @DeleteMapping("/unlink-deposit-from-unit/{depositId}/{unitId}")
    public ResponseEntity<?> unlinkDepositFromUnit(@PathVariable("depositId") Long depositId,
            @PathVariable("unitId") Long unitId) {
        return depositService.unlinkDepositFromUnit(depositId, unitId);
    }

}
