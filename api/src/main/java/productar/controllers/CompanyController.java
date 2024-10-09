package productar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.models.CompanyModel;
import productar.services.CompanyService;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @PostMapping("/create")
    public ResponseEntity<?> createCompany(@RequestBody CompanyModel newCompany) {
        return this.companyService.createCompany(newCompany);
    }

    @DeleteMapping("/delete/{companyId}")
    public ResponseEntity<?> deleteCompany(@PathVariable("companyId") Long companyId) {
        return this.companyService.deleteCompany(companyId);
    }

    @GetMapping("/get-by-id/{companyId}")
    public ResponseEntity<?> findCompanyById(@PathVariable("companyId") Long companyId) {
        return this.companyService.findCompanyById(companyId);
    }

    @GetMapping("/get-companies-by-owner")
    public ResponseEntity<?> findByOwnerId() {
        return this.companyService.findCompaniesByOwnerId();
    }

    @GetMapping("/find-companies-with-user-as-owner-or-employee")
    public ResponseEntity<?> findCompaniesWithUserAsOwnerOrEmployee() {
        return this.companyService.findCompaniesWithUserAsOwnerOrEmployee();
    }
}
