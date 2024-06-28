package productar.utils;

import org.springframework.stereotype.Component;

@Component
public class ValidateFields {
    public Boolean Validate(String[] fields) {
        for (int i = 0; i < fields.length; i++) {
            if (fields[i].trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }
}
