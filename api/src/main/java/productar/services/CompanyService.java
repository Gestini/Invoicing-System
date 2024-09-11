package productar.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import productar.models.CompanyModel;
import productar.repositories.CompanyRespository;

@Service
public class CompanyService {

    @Autowired
    private CompanyRespository companyRespository;

    public CompanyModel createCompany(CompanyModel newCompany) {
        return companyRespository.save(newCompany);
    }

    public ResponseEntity<?> deleteCompany(Long companyId) {
        try {
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

}
