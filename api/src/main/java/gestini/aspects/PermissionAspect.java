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
import jakarta.servlet.http.HttpServletRequest;

@Aspect
@Component
public class PermissionAspect {

    @Autowired
    private RoleService roleService;

    @Around("@within(checkPermissions)")
    public Object checkPermissions(ProceedingJoinPoint joinPoint, CheckPermissions checkPermissions) throws Throwable {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attributes == null)
            throw new SecurityException("No se pudo obtener los atributos de la solicitud");

        HttpServletRequest request = attributes.getRequest();

        // Obtener el unitId del encabezado
        String unitId = request.getHeader("X-UnitId");
        Permission permission = checkPermissions.value();

        // Aquí puedes usar el unitId para verificar permisos
        Boolean hasPermissions = roleService.hasPermissions(Long.parseLong(unitId), permission);

        if (!hasPermissions)
            throw new SecurityException("No tienes permisos para acceder a este recurso");

        return joinPoint.proceed();
    }
}
