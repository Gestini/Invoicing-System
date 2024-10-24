package gestini.modules.order.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import gestini.modules.order.models.OrderModel;

public interface OrderRepository extends JpaRepository<OrderModel, Long> {
}
