package gestini.modules.company;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gestini.modules.businessUnit.models.BusinessUnitModel;
import gestini.modules.businessUnit.repositories.BusinessUnitsDepositRespository;
import gestini.modules.businessUnit.repositories.BusinessUnitsRepository;
import gestini.modules.company.models.CompanyModel;
import gestini.modules.company.repositories.CompanyRepository;
import gestini.modules.deposit.models.BusinessUnitDepositModel;
import gestini.modules.deposit.models.DepositModel;
import gestini.modules.deposit.repositories.DepositRepository;
import gestini.modules.user.models.User;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRespository;

    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    @Autowired
    private BusinessUnitsDepositRespository businessUnitsDepositRespository;

    @Autowired
    private DepositRepository depositRepository;

    @Transactional
    public ResponseEntity<?> createCompany(CompanyModel newCompany) {
        try {
            /* Obtener el usuario logeado */
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();

            /* Establecer datos de la compañía y guardarla */
            CompanyModel company = new CompanyModel();
            company.setName(newCompany.getName());
            company.setOwner(user);
            company.setImage(newCompany.getImage());
            company.setDescription(newCompany.getDescription());
            CompanyModel createdCompany = companyRespository.save(company);

            /* Crear y guardar la unidad de negocio */
            BusinessUnitModel newUnit = new BusinessUnitModel();
            newUnit.setCompany(createdCompany);
            newUnit.setName(newCompany.getName());
            BusinessUnitModel savedBusinessUnit = businessUnitsRepository.save(newUnit);

            /* Crear y guardar el depósito */
            DepositModel newDeposit = new DepositModel();
            newDeposit.setName("Depósito");
            newDeposit.setCompany(createdCompany);
            DepositModel savedDeposit = depositRepository.save(newDeposit);

            /* Relacionar depósito con la unidad de negocio */
            BusinessUnitDepositModel businessUnitDeposit = new BusinessUnitDepositModel();
            businessUnitDeposit.setBusinessUnit(savedBusinessUnit);
            businessUnitDeposit.setDeposit(savedDeposit);
            businessUnitsDepositRespository.save(businessUnitDeposit);

            return ResponseEntity.ok(createdCompany);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
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

    public ResponseEntity<?> findCompaniesByOwnerId() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();

            List<CompanyModel> companies = companyRespository.findCompaniesByOwnerId(user.getId());

            if (companies.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron compañías");
            }

            return ResponseEntity.ok(companies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> findCompaniesWithUserAsOwnerOrEmployee() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();

            List<CompanyModel> companies = companyRespository.findCompaniesWithUserAsOwnerOrEmployee(user.getId());

            if (companies.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron compañías");
            }

            return ResponseEntity.ok(companies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error");
        }
    }

}
