package productar.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import productar.models.BusinessUnitsModel;
import productar.models.User;
import productar.repositories.BusinessUnitsRepository;
import productar.repositories.UserRepository;

@Service
public class BusinessUnitsService {
    @Autowired
    BusinessUnitsRepository businessUnitsRepository;

    @Autowired
    private UserRepository userRepository;

    public Boolean BusinessExists(Long id) {
        Optional<BusinessUnitsModel> businessUnit = businessUnitsRepository.findById(id);
        return businessUnit.isPresent();
    }

    public ArrayList<BusinessUnitsModel> getAllBusinessUnit() {
        return (ArrayList<BusinessUnitsModel>) businessUnitsRepository.findAll();
    }

    public List<BusinessUnitsModel> getBusinessUnitsByToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();

        // Buscar las unidades de negocio asociadas al usuario
        List<BusinessUnitsModel> businessUnits = businessUnitsRepository.findByOwnerUsername(username);

        return businessUnits;
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No tienes permisos suficientes");
        }

        try {
            businessUnitsRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Unidad de negocio eliminada");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Ocurrió un error");
        }
    }

}
