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

import gestini.annotations.CheckPermissions;
import gestini.modules.deposit.models.DepositModel;
import gestini.utils.Permission;
import gestini.utils.UnitContext;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;

@RestController
@RequestMapping("/deposit")
@SecurityRequirements({
        @SecurityRequirement(name = "BearerAuth"),
        @SecurityRequirement(name = "UnitAccess")
})
@CheckPermissions(Permission.MANAGE_STOCK)
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

    @GetMapping("/get-by-unit-id")
    public ResponseEntity<?> getDepositsByUnitId() {
        return depositService.getDepositsByUnitId(UnitContext.getUnitId());
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
