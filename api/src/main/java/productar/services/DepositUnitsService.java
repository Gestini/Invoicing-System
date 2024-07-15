package productar.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import productar.models.DepositUnitsModel;
import productar.repositories.DepositUnitsRepository;

@Service
public class DepositUnitsService {

    @Autowired
    private DepositUnitsRepository depositUnitsRepository;

    public DepositUnitsModel saveDepositUnit(DepositUnitsModel depositUnit) {
        return depositUnitsRepository.save(depositUnit);
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

    public List<DepositUnitsModel> findByBusinessUnitId(long id) {
        return depositUnitsRepository.findByBusinessUnitId(id);
    }
}
