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
        return businessUnitInventoryService.asingProductToInventory(data);
    }

    @GetMapping("/find-by-unit-id/{unitId}")
    public ResponseEntity<?> findInventoryByUnitId(@PathVariable("unitId") Long unitId) {
        return businessUnitInventoryService.findInventoryByUnitId(unitId);
    }

    @GetMapping("/search-product-by-name-and-unit/{unitId}")
    public ResponseEntity<?> searchProductByNameAndUnit(@PathVariable("unitId") Long unitId,
            @RequestParam("name") String name) {
        return businessUnitInventoryService.findInventoryByUnitId(unitId);
    }

    @DeleteMapping("/remove-inventory-by-id/{inventoryId}")
    public ResponseEntity<?> removeInventoryById(@PathVariable("inventoryId") Long inventoryId) {
        return businessUnitInventoryService.removeInventoryById(inventoryId);
    }

}
