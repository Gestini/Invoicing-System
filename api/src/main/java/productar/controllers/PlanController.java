package productar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import productar.models.PlanModel;
import productar.services.PlanService;

@RestController
@RequestMapping("/plan")
public class PlanController {

    @Autowired
    private PlanService planService;

    @PostMapping("/create")
    public ResponseEntity<?> createPlan(@RequestBody PlanModel plan) {
        return planService.createPlan(plan);
    }

    @PutMapping("/edit/{planId}")
    public ResponseEntity<?> editPlan(@RequestBody PlanModel newData, @PathVariable("planId") Long planId) {
        return planService.editPlanById(planId, newData);
    }

    @DeleteMapping("/delete/{planId}")
    public ResponseEntity<?> deltePlanById(@PathVariable("planId") Long planId) {
        return planService.deletePlan(planId);
    }

    @GetMapping("/get-all")
    public List<PlanModel> getAllPlans() {
        return planService.getAllPlans();
    }

    @GetMapping("/get/{planId}")
    public ResponseEntity<?> getPlanById(@PathVariable("planId") Long planId) {
        return planService.getPlanById(planId);
    }

}
