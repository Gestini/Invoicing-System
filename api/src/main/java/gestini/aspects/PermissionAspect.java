package gestini.aspects;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import gestini.annotations.CheckPermissions;
import gestini.modules.role.RoleService;
import gestini.utils.Permission;
import gestini.utils.UnitContext;
import jakarta.servlet.http.HttpServletRequest;

@Aspect
@Component
public class PermissionAspect {

    @Autowired
    private RoleService roleService;

    @Around("@within(checkPermissions)")
    public Object checkPermissions(ProceedingJoinPoint joinPoint, CheckPermissions checkPermissions) throws Throwable {
        Long unitId = this.getUnitId();

        Permission permission = checkPermissions.value();
        Boolean hasPermissions = roleService.hasPermissions(unitId, permission);

        if (!hasPermissions)
            throw new SecurityException("No tienes permisos para acceder a este recurso");

        UnitContext.setUnitId(unitId);

        try {
            return joinPoint.proceed();
        } finally {
            UnitContext.clear();
        }
    }

    private Long getUnitId() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null)
            throw new SecurityException("No se pudo obtener los atributos de la solicitud");

        HttpServletRequest request = attributes.getRequest();
        return Long.parseLong(request.getHeader("X-UnitId"));
    }
}