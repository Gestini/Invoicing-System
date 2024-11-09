package gestini.modules.discount;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gestini.annotations.CheckPermissions;
import gestini.modules.discount.dto.CreateDiscountDto;
import gestini.modules.discount.dto.EditDiscountDto;
import gestini.utils.Permission;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/discount")
@SecurityRequirements({
        @SecurityRequirement(name = "BearerAuth"),
        @SecurityRequirement(name = "UnitAccess")
})
@CheckPermissions(Permission.MANAGE_OPERATIONS)
public class DiscountController {

    @Autowired
    private DiscountService discountService;

    @PostMapping("/create/{unitId}")
    public ResponseEntity<?> createDiscount(@PathVariable("unitId") Long unitId,
            @Valid @RequestBody CreateDiscountDto newDiscountDto) {
        return discountService.createDiscount(unitId, newDiscountDto);
    }

    @GetMapping("/find-by-code/{code}")
    public ResponseEntity<?> findDiscountByCode(@PathVariable("code") String code) {
        return discountService.findDiscountByCode(code);
    }

    @PatchMapping("/edit/{discountId}")
    public ResponseEntity<?> editDiscount(@PathVariable("discountId") Long discountId,
            @Valid @RequestBody EditDiscountDto body) {
        return discountService.editDiscount(discountId, body);
    }

    @GetMapping("/find-all-by-unit-id/{unitId}")
    public ResponseEntity<?> findAllDiscountsByUnitId(@PathVariable("unitId") Long unitId) {
        return discountService.findAllDiscountsByUnitId(unitId);
    }

    @DeleteMapping("/delete-by-id/{discountId}")
    public ResponseEntity<?> deleteDiscountById(@PathVariable("discountId") Long discountId) {
        return discountService.deleteDiscountById(discountId);
    }

}
