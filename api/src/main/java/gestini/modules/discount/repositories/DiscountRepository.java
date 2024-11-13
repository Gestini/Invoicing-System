package gestini.modules.discount.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import gestini.modules.discount.models.DiscountModel;

@Repository
public interface DiscountRepository extends JpaRepository<DiscountModel, Long> {
    Optional<DiscountModel> findDiscountByCode(String code);

    @Query("SELECT discount FROM DiscountModel discount WHERE discount.businessUnit.id = :unitId")
    List<DiscountModel> findAllDiscountsByUnitId(Long unitId);
}
