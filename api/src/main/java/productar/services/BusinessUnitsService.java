package productar.services;

import java.security.Key;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import productar.models.BusinessUnitPlanModel;
import productar.models.BusinessUnitsModel;
import productar.models.EmployeeModel;
import productar.models.PlanModel;
import productar.models.User;
import productar.repositories.BusinessUnitsPlanRepository;
import productar.repositories.BusinessUnitsRepository;
import productar.repositories.EmployeeRepository;
import productar.repositories.PlanRepository;
import productar.repositories.UserRepository;

@Service
public class BusinessUnitsService {
    @Autowired
    private BusinessUnitsRepository businessUnitsRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusinessUnitsPlanRepository businessUnitsPlanRepository;

    @Autowired
    private PlanRepository planRepository;

    @Value("${secretKeyPlan}")
    private String SECRET_KEY_PLAN;

    public Boolean BusinessExists(Long id) {
        Optional<BusinessUnitsModel> businessUnit = businessUnitsRepository.findById(id);
        return businessUnit.isPresent();
    }

    public ArrayList<BusinessUnitsModel> getAllBusinessUnit() {
        return (ArrayList<BusinessUnitsModel>) businessUnitsRepository.findAll();
    }

    public ArrayList<BusinessUnitsModel> getAllEcommerceBusinessUnits() {
        return (ArrayList<BusinessUnitsModel>) businessUnitsRepository.findByEcommerceTrue();
    }

    public List<BusinessUnitsModel> getBusinessUnitsByToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();

        // Buscar las unidades de negocio asociadas al usuario
        List<BusinessUnitsModel> businessUnits = businessUnitsRepository.findByOwnerUsername(username);

        return businessUnits;
    }

    public List<BusinessUnitsModel> getUserBusinessUnits() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();

        // Obtener unidades donde el usuario es dueño
        List<BusinessUnitsModel> ownedUnits = businessUnitsRepository.findByOwnerUsername(username);

        // Obtener unidades donde el usuario es empleado
        List<BusinessUnitsModel> employeeUnits = employeeRepository.findByUserUsername(username)
                .stream()
                .map(EmployeeModel::getBusinessUnit)
                .collect(Collectors.toList());

        // Combinar y eliminar duplicados
        ownedUnits.addAll(employeeUnits);

        return ownedUnits.stream().distinct().collect(Collectors.toList());
    }

    public ResponseEntity<BusinessUnitsModel> saveBusinessUnit(BusinessUnitsModel businessUnit, String username) {
        User owner = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        businessUnit.setOwner(owner);
        BusinessUnitsModel saved = businessUnitsRepository.save(businessUnit);

        return ResponseEntity.status(HttpStatus.OK).body(saved);
    }

    public Optional<BusinessUnitsModel> getBusinessUnitById(Long id) {
        return businessUnitsRepository.findById(id);
    }

    public ResponseEntity<String> deleteBusinessUnitById(Long id) {
        BusinessUnitsModel businessUnit = businessUnitsRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Unidad de negocio no encontrada"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        User owner = businessUnit.getOwner();

        if (!owner.getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Solo el dueño puede eliminar la unidad");
        }

        try {
            businessUnitsRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Unidad de negocio eliminada");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

    public ResponseEntity<?> assingPlan(String token) {
        try {
            // Obtener todas las Claims del token
            Claims claims = getAllClaims(token);

            // Extraer información específica del token
            Long planId = claims.get("planId", Long.class);
            Long unitId = claims.get("unitId", Long.class);

            // Verifica que el PlanModel existe
            PlanModel selectedPlan = planRepository.findById(planId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Plan no encontrado"));

            // Verifica que la Unidad de Negocio existe
            BusinessUnitsModel selectedUnit = businessUnitsRepository.findById(unitId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unidad no encontrada"));

            // Elimina el plan actual si existe
            BusinessUnitPlanModel currentPlan = selectedUnit.getPlan();
            if (currentPlan != null) {
                // Elimina la referencia al plan actual en la unidad de negocio
                selectedUnit.setPlan(null);
                businessUnitsRepository.save(selectedUnit);

                // Elimina el plan actual
                businessUnitsPlanRepository.delete(currentPlan);
            }

            // Crear el objeto BusinessUnitPlanModel
            BusinessUnitPlanModel businessUnitPlan = new BusinessUnitPlanModel();
            businessUnitPlan.setCreatedAt(LocalDate.now());
            businessUnitPlan.setEndDate(LocalDate.now().plusMonths(1));
            businessUnitPlan.setPlan(selectedPlan);

            // Guardar el nuevo plan en la base de datos
            BusinessUnitPlanModel savedPlan = businessUnitsPlanRepository.save(businessUnitPlan);

            // Actualizar la unidad de negocio para referirse al nuevo plan asignado
            selectedUnit.setPlan(savedPlan);
            businessUnitsRepository.save(selectedUnit);

            return ResponseEntity.status(HttpStatus.OK).body("Plan asignado correctamente a la unidad de negocio");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error inesperado: " + e.getMessage());
        }
    }

    public ResponseEntity<BusinessUnitsModel> updateBusinessUnit(Long id, BusinessUnitsModel updatedData,
            String username) {
        // Buscar la unidad de negocio por ID
        BusinessUnitsModel existingBusinessUnit = businessUnitsRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unidad de negocio no encontrada"));

        // Verificar que el usuario autenticado sea el dueño de la unidad
        User owner = existingBusinessUnit.getOwner();
        if (!owner.getUsername().equals(username)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        if (Optional.ofNullable(updatedData.getName()).isPresent()) {
            existingBusinessUnit.setName(updatedData.getName());
        }
        if (Optional.ofNullable(updatedData.getDescription()).isPresent()) {
            existingBusinessUnit.setDescription(updatedData.getDescription());
        }
        if (Optional.ofNullable(updatedData.getLink()).isPresent()) {
            existingBusinessUnit.setLink(updatedData.getLink());
        }
        if (Optional.ofNullable(updatedData.getImage()).isPresent()) {
            existingBusinessUnit.setImage(updatedData.getImage());
        }
        if (Optional.ofNullable(updatedData.getEcommerce()).isPresent()) {
            existingBusinessUnit.setEcommerce(updatedData.getEcommerce());
        }
        BusinessUnitsModel savedBusinessUnit = businessUnitsRepository.save(existingBusinessUnit);

        return ResponseEntity.ok(savedBusinessUnit);
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
