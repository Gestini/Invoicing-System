package gestini.utils;

import org.springframework.stereotype.Component;

@Component
public class UnitContext {
    private static final ThreadLocal<Long> currentUnitId = new ThreadLocal<>();

    public static void setUnitId(Long unitId) {
        currentUnitId.set(unitId);
    }

    public static Long getUnitId() {
        return currentUnitId.get();
    }

    public static void clear() {
        currentUnitId.remove();
    }
}
