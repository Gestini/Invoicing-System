package productar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import productar.models.DepositUnitsModel;
import productar.models.User;
import productar.repositories.DepositUnitsRepository;
import productar.repositories.UserRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DepositUnitsService {

    @Autowired
    private DepositUnitsRepository depositUnitsRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<DepositUnitsModel> saveDepositUnit(DepositUnitsModel depositUnit, String username) {
        User owner = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        depositUnit.setOwner(owner);
        DepositUnitsModel saved = depositUnitsRepository.save(depositUnit);

        return ResponseEntity.status(HttpStatus.OK).body(saved);
    }

    public Optional<DepositUnitsModel> getDepositUnitById(Long id) {
        return depositUnitsRepository.findById(id);
    }

    public DepositUnitsModel updateDepositUnit(DepositUnitsModel depositUnit) {
        return depositUnitsRepository.save(depositUnit);
    }

    public void deleteDepositUnit(Long id) {
        depositUnitsRepository.deleteById(id);
    }

    public List<Map<String, Object>> getDepositUnitsByOwner() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        List<DepositUnitsModel> depositUnits = depositUnitsRepository.findByOwnerUsername(username);

        // Crear una lista para almacenar resultados simplificados
        List<Map<String, Object>> simplifiedList = new ArrayList<>();

        for (DepositUnitsModel unit : depositUnits) {
            Map<String, Object> simplifiedUnit = new HashMap<>();
            simplifiedUnit.put("id", unit.getId());
            simplifiedUnit.put("name", unit.getName());
            simplifiedList.add(simplifiedUnit);
        }

        return simplifiedList;
    }
}
