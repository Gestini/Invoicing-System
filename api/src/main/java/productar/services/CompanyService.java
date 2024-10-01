package productar.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import productar.models.BusinessUnitModel;
import productar.models.CompanyModel;
import productar.models.User;
import productar.repositories.BusinessUnitsRepository;
import productar.repositories.CompanyRepository;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRespository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    public ResponseEntity<?> createCompany(CompanyModel newCompany) {
        try {
            /* El dueño es el usuario logeado */
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();

            /* Establecemos los datos de la compañia y la creamos */
            CompanyModel company = new CompanyModel();
            company.setName(newCompany.getName());
            company.setOwner(user);
            company.setImage(newCompany.getImage());
            company.setDescription(newCompany.getDescription());
            CompanyModel createdCompany = companyRespository.save(company);

            /* Creamos la unidad de negocio */
            BusinessUnitModel newUnit = new BusinessUnitModel();
            newUnit.setCompany(createdCompany);
            newUnit.setName(newCompany.getName());
            businessUnitsRepository.save(newUnit);

            return ResponseEntity.ok(createdCompany);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurró un error");
        }
    }

    public ResponseEntity<?> deleteCompany(Long companyId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();

            Optional<CompanyModel> company = companyRespository.findById(companyId);

            if (!company.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Compañia no encontrada");
            }

            User owner = company.get().getOwner();

            if (!owner.getId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Solo el dueño puede eliminar la compañía");
            }

            companyRespository.deleteById(companyId);
            return ResponseEntity.ok("Compañia eliminada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> findCompanyById(Long companyId) {
        try {
            Optional<CompanyModel> company = companyRespository.findById(companyId);

            if (!company.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Compañia no encontrada");
            }

            return ResponseEntity.ok(company);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> findCompanyByOwnerId() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();

            List<CompanyModel> companies = companyRespository.findCompanyByOwnerId(user.getId());

            if (companies.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron compañías");
            }

            return ResponseEntity.ok(companies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> findUnitByCompany(Long companyId) {
        try {
            BusinessUnitModel unit = businessUnitsRepository.findFirstByCompanyId(companyId);

            return ResponseEntity.ok(unit);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

}
