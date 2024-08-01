package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import productar.models.OrderModel;

public interface OrderRepository extends JpaRepository<OrderModel, Long> {
}
