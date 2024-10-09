package productar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import productar.models.CompanyModel;

@Repository
public interface CompanyRespository extends JpaRepository<CompanyModel, Long> {

    @Query("SELECT company FROM CompanyModel company WHERE company.owner.id = :ownerId")
    List<CompanyModel> findCompanyByOwnerId(@PathVariable("ownerId") Long ownerId);

}
