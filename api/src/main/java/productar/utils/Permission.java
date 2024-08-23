package productar.utils;

public class Permission {
    private final String title;
    private final String permission;
    private final String description;

    public Permission(String title, String permission, String description) {
        this.title = title;
        this.permission = permission;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public String getPermission() {
        return permission;
    }

    public String getDescription() {
        return description;
    }
}