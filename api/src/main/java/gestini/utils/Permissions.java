package gestini.utils;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class Permissions {

    // Definir permisos como constantes
    public static final Permission WAREHOUSE = new Permission(
            "Gestionar depósitos",
            "MANAGE_STOCK",
            "Permite gestionar la sección de depósitos.");

    public static final Permission HR = new Permission(
            "Gestionar recursos humanos",
            "MANAGE_HR",
            "Permite gestionar la sección de recursos humanos.");

    public static final Permission OPERATIONS = new Permission(
            "Gestionar operaciones",
            "MANAGE_OPERATIONS",
            "Permite gestionar la sección de operaciones.");

    public static final Permission POS = new Permission(
            "Gestionar punto de venta",
            "MANAGE_POS",
            "Permite gestionar la sección de puntos de venta.");

    public static final Permission ADMIN = new Permission(
            "Admin",
            "*",
            "Ignora las restricciones.");

    // Crear un mapa de permisos para acceder por clave
    private static final Map<String, Permission> PERMISSION_MAP;

    static {
        Map<String, Permission> map = new HashMap<>();
        map.put("warehouse", WAREHOUSE);
        map.put("hr", HR);
        map.put("operations", OPERATIONS);
        map.put("pos", POS);
        map.put("admin", ADMIN);
        PERMISSION_MAP = Collections.unmodifiableMap(map);
    }

    // Método para obtener un permiso por su clave
    public static Permission getPermission(String key) {
        return PERMISSION_MAP.get(key);
    }
}
