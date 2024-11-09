package gestini.utils;

import java.util.List;

public class PlanList {
    public static List<PlanConfig> getPlanList() {
        return List.of(
                new PlanConfig(
                        "Default",
                        1.0f,
                        true,
                        false,
                        "Gestiona como los grandes",
                        List.of(Permission.ADMIN, Permission.DEFAULT_ACCESS)),

                new PlanConfig(
                        "Advanced",
                        10.0f,
                        false,
                        true,
                        "Control avanzado para tu negocio",
                        List.of(Permission.MANAGE_STOCK, Permission.MANAGE_HR, Permission.MANAGE_DOCUMENTS)),

                new PlanConfig(
                        "Premium",
                        50.0f,
                        false,
                        true,
                        "Acceso completo con características premium",
                        List.of(Permission.MANAGE_STOCK, Permission.MANAGE_HR, Permission.MANAGE_OPERATIONS,
                                Permission.ADMIN)));
    }

    public static class PlanConfig {
        public String name;
        public float price;
        public boolean isDefault;
        public boolean isPopular;
        public String description;
        public List<Permission> permissions;

        public PlanConfig(String name, float price, boolean isDefault, boolean isPopular, String description,
                List<Permission> permissions) {
            this.name = name;
            this.price = price;
            this.isDefault = isDefault;
            this.isPopular = isPopular;
            this.description = description;
            this.permissions = permissions;
        }
    }
}
