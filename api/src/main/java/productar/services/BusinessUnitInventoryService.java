package productar.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import productar.dto.InventoryRequest;
import productar.models.BusinessUnitInventoryModel;
import productar.models.BusinessUnitModel;
import productar.models.ProductModel;
import productar.repositories.BusinessUnitInventoryRepository;
import productar.repositories.BusinessUnitsRepository;
import productar.repositories.ProductRepository;

@Service
public class BusinessUnitInventoryService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BusinessUnitInventoryRepository inventoryRepository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    public ResponseEntity<?> findInventoryByUnitId(Long unitId) {
        try {
            List<BusinessUnitInventoryModel> unitInventory = inventoryRepository.findInventoryByUnitId(unitId);
            if (unitInventory.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sin productos en el inventario");
            }

            return ResponseEntity.ok(unitInventory);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> searchProductByNameAndUnit(Long unitId, String name) {
        try {
            List<BusinessUnitInventoryModel> result = inventoryRepository.searchProductByNameAndUnit(unitId, name);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    @Transactional
    public ResponseEntity<?> removeInventoryById(Long inventoryId) {
        try {
            Optional<BusinessUnitInventoryModel> inventoryOptional = inventoryRepository.findById(inventoryId);
            if (!inventoryOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Inventario no encontrado");
            }

            BusinessUnitInventoryModel inventory = inventoryOptional.get();
            ProductModel inventoryProduct = inventory.getProduct();

            /* Buscadmos el producto */
            Optional<ProductModel> optionalProduct = productRepository.findById(inventoryProduct.getId());
            if (!optionalProduct.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
            }
            ProductModel product = optionalProduct.get();

            /* Le restauramos la cantidad */
            product.setQuantity(product.getQuantity() + inventory.getQuantity());

            inventoryRepository.deleteById(inventoryId);

            return ResponseEntity.ok("Producto removido del inventario");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    @Transactional
    public ResponseEntity<?> asingProductToInventory(InventoryRequest data) {
        try {
            Long unitId = data.getUnitId();
            Long productId = data.getProductId();
            Integer quantity = data.getQuantity();

            /* Buscamos la unidad */
            Optional<BusinessUnitModel> optionalUnit = businessUnitsRepository.findById(unitId);
            if (!optionalUnit.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unidad no encontrada");
            }
            BusinessUnitModel unit = optionalUnit.get();

            /* Buscadmos el producto */
            Optional<ProductModel> optionalProduct = productRepository.findById(productId);
            if (!optionalProduct.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
            }
            ProductModel product = optionalProduct.get();

            /* Buscamos el producto en el inventario de la unidad */
            Optional<BusinessUnitInventoryModel> optionalInventory = inventoryRepository
                    .findInventoryProductByProductId(productId, unitId);

            /*
             * Si la cantidad del producto en almacen es menor a la cantidad estimada para
             * la transferencia al inventario
             */
            Integer productQuantity = product.getQuantity();
            if (productQuantity < quantity) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                        .body("Cantidad no suficiente en el almacen");
            }

            /* Nueva cantidad del producto en el almacen */
            Integer updatedProductQuantity = productQuantity - quantity;
            product.setQuantity(updatedProductQuantity);
            productRepository.save(product);

            /* Si no existe el producto en el inventario de la unidad lo creamos */
            if (!optionalInventory.isPresent()) {
                BusinessUnitInventoryModel newInventory = new BusinessUnitInventoryModel();
                newInventory.setQuantity(quantity);
                newInventory.setProduct(product);
                newInventory.setBusinessUnit(unit);
                inventoryRepository.save(newInventory);
            } else {
                /* Caso contrario actualizamos solo su cantidad */
                BusinessUnitInventoryModel inventory = optionalInventory.get();
                Integer updatedInvetoryProductQuantety = inventory.getQuantity() + quantity;
                inventory.setQuantity(updatedInvetoryProductQuantety);
                inventoryRepository.save(inventory);
            }

            return ResponseEntity.ok("Producto actualizado correctamente en el inventario");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

}
