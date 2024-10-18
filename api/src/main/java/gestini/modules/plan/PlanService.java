package gestini.modules.plan;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import gestini.modules.plan.models.PlanModel;
import gestini.modules.plan.repositories.PlanRepository;

@Service
public class PlanService {

    @Autowired
    private PlanRepository planRepository;

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
}
