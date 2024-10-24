package gestini.modules.order;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import gestini.modules.order.models.OrderModel;
import gestini.modules.order.repositories.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public OrderModel createOrder(OrderModel order) {
        return orderRepository.save(order);
    }

    public OrderModel updateOrder(OrderModel order) {
        Optional<OrderModel> existingOrder = orderRepository.findById(order.getId());
        if (existingOrder.isPresent()) {
            return orderRepository.save(order);
        } else {
            throw new EntityNotFoundException("No se encontró el pedido con ID: " + order.getId());
        }
    }

    public List<OrderModel> getAllOrders() {
        return orderRepository.findAll();
    }

    public OrderModel getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
