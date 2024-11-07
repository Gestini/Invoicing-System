package gestini.modules.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gestini.annotations.CheckPermissions;
import gestini.modules.inventory.dto.InventoryRequestDto;
import gestini.utils.Permission;
import gestini.utils.UnitContext;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;

@RestController
@RequestMapping("/inventory")
@SecurityRequirements({
        @SecurityRequirement(name = "BearerAuth"),
        @SecurityRequirement(name = "UnitAccess")
})
@CheckPermissions(Permission.MANAGE_STOCK)
public class InventoryController {

    @Autowired
    private InventoryService businessUnitInventoryService;

    @PostMapping("/asing-product-to-inventory")
    public ResponseEntity<?> asingProductToInventory(@RequestBody InventoryRequestDto data) {
        return businessUnitInventoryService.asingProductToInventory(UnitContext.getUnitId(), data);
    }

    @GetMapping("/find-by-unit-id")
    public ResponseEntity<?> findInventoryByUnitId() {
        return businessUnitInventoryService.findInventoryByUnitId(UnitContext.getUnitId());
    }

    @GetMapping("/search-product-by-name")
    public ResponseEntity<?> searchInventoryProductByNameAndUnit(@RequestParam("name") String name) {
        return businessUnitInventoryService.searchInventoryProductByNameAndUnit(UnitContext.getUnitId(), name);
    }

    @DeleteMapping("/remove-inventory-by-id/{inventoryId}")
    public ResponseEntity<?> removeInventoryById(@PathVariable("inventoryId") Long inventoryId) {
        return businessUnitInventoryService.removeInventoryById(inventoryId);
    }

}
