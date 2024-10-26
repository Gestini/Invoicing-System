package gestini.modules.plan;

import java.lang.reflect.Field;
import java.security.Key;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import gestini.modules.company.models.CompanyModel;
import gestini.modules.company.models.CompanyPlanModel;
import gestini.modules.company.repositories.CompanyPlanRepository;
import gestini.modules.company.repositories.CompanyRepository;
import gestini.modules.plan.dto.AddPermsDto;
import gestini.modules.plan.models.PlanModel;
import gestini.modules.plan.models.PlanPermissionsModel;
import gestini.modules.plan.repositories.PlanPermissionsRepository;
import gestini.modules.plan.repositories.PlanRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class PlanService {

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CompanyPlanRepository companyPlanRepository;

    @Autowired
    private PlanPermissionsRepository planPermissionsRepository;

    @Value("${secretKeyPlan}")
    private String SECRET_KEY_PLAN;

    public ResponseEntity<?> createPlan(PlanModel plan) {
        try {
            PlanModel newPlan = planRepository.save(plan);
            return ResponseEntity.ok(newPlan);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

    public ResponseEntity<String> deletePlan(Long id) {
        try {
            planRepository.deleteById(id);
            return ResponseEntity.ok("Plan eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> addPermission(Long planId, AddPermsDto body) {
        try {
            Optional<PlanModel> planOptional = planRepository.findById(planId);

            if (!planOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Plan no encontrado");
            }

            PlanModel plan = planOptional.get();
            PlanPermissionsModel planPermission = new PlanPermissionsModel();
            planPermission.setName(body.getName());
            planPermission.setPlan(plan);
            PlanPermissionsModel savedPlanPermission = planPermissionsRepository.save(planPermission);
            return ResponseEntity.ok(savedPlanPermission);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> removePermission(Long permissionId) {
        try {
            Optional<PlanPermissionsModel> planPermission = planPermissionsRepository.findById(permissionId);
            if (!planPermission.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Permiso no encontrado");
            }

            planPermissionsRepository.deleteById(permissionId);
            return ResponseEntity.ok("Permiso removido correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

    public List<PlanModel> getAllPlans() {
        return planRepository.findAll();
    }

    public ResponseEntity<?> getPlanById(Long planId) {
        try {
            Optional<PlanModel> plan = planRepository.findById(planId);

            if (!plan.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Plan no encontrado");
            }

            return ResponseEntity.ok(plan);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> assingPlan(String token) {
        try {
            Claims claims = getAllClaims(token);

            Long planId = claims.get("planId", Long.class);
            Long companyId = claims.get("companyId", Long.class);

            PlanModel selectedPlan = planRepository.findById(planId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Plan no encontrado"));

            CompanyModel selectedCompany = companyRepository.findById(companyId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Compañía no encontrada"));

            CompanyPlanModel currentPlan = selectedCompany.getPlan();

            if (currentPlan != null) {
                selectedCompany.setPlan(null);
                companyRepository.save(selectedCompany);
                companyPlanRepository.delete(currentPlan);
            }

            CompanyPlanModel newCompanyPlan = new CompanyPlanModel();
            newCompanyPlan.setCreatedAt(LocalDate.now());
            newCompanyPlan.setEndDate(LocalDate.now().plusMonths(1));
            newCompanyPlan.setPlan(selectedPlan);

            CompanyPlanModel savedPlan = companyPlanRepository.save(newCompanyPlan);

            selectedCompany.setPlan(savedPlan);
            companyRepository.save(selectedCompany);

            return ResponseEntity.status(HttpStatus.OK).body("Plan asignado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error inesperado" + e.getMessage());
        }
    }

    public ResponseEntity<?> editPlanById(Long planId, PlanModel newData) {
        try {
            Optional<PlanModel> existingPlanOptional = planRepository.findById(planId);

            if (!existingPlanOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el plan con ID: " + planId);
            }

            PlanModel existingPlan = existingPlanOptional.get();

            if (newData == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Los datos del plan a actualizar son nulos");
            }

            copyNonNullProperties(newData, existingPlan);

            planRepository.save(existingPlan);

            return ResponseEntity.ok("Plan actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

    private void copyNonNullProperties(PlanModel source, PlanModel target) {
        Field[] fields = PlanModel.class.getDeclaredFields();
        for (Field field : fields) {
            try {
                field.setAccessible(true);
                Object value = field.get(source);
                if (value != null) {
                    field.set(target, value);
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    private Key getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY_PLAN);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims getAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
