package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.EcommerceCategoryModel;

@Repository
public interface EcommerceCategoryRespository extends JpaRepository<EcommerceCategoryModel, Long> {
}
