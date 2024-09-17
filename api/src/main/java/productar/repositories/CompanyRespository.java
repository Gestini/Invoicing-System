package productar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import productar.models.CompanyModel;

@Repository
public interface CompanyRespository extends JpaRepository<CompanyModel, Long> {
}
