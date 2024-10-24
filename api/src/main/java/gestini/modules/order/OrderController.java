package gestini.modules.order;

import java.util.List;

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

import gestini.modules.order.models.OrderModel;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/orders")
@SecurityRequirement(name = "BearerAuth")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderModel>> getAllOrders() {
        List<OrderModel> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderModel> getOrderById(@PathVariable("id") Long id) {
        OrderModel order = orderService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<OrderModel> createOrder(@RequestBody OrderModel order) {
        OrderModel createdOrder = orderService.createOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderModel> updateOrder(@PathVariable("id") Long id, @RequestBody OrderModel order) {
        order.setId(id);
        OrderModel updatedOrder = orderService.updateOrder(order);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable("id") Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
