
# Git Repository

## Formato para realizar commits

```
fix: 🐛 Descripción del arreglo de un bug

feat: ✨ Descripción de una nueva funcionalidad

style: 🌈 Descripción de cambios de estilo (no afectan la funcionalidad)

chore: 📜 Descripción de tareas varias (configuración, actualización de dependencias, etc.)

refactor: 🛠️ Descripción de cambios en el código sin agregar funcionalidades nuevas

🗑️ Descripción de archivos eliminados
```

## Commits frecuentes

```
style: 🌈 corrección de detalles

refactor: 🛠️ modularización de componentes
```

## Emojis para los commits

```
✨ Nueva funcionalidad
🌱 Trabajo en progreso
📖 Documentación
📦 Nuevas dependencias
🌈 Cambios en el estilo
🐛 Corrección de errores
📜 Tareas varias
✅ Cambios listos para producción
🗑️ Archivos eliminados
```

## Estructura de las ramas

Para mantener un flujo de trabajo ordenado y coherente, seguimos las siguientes convenciones para la creación de ramas:

- **Rama principal (main)**: Contiene el código en producción.
- **Rama de desarrollo (develop)**: Contiene el código que se encuentra en desarrollo y pruebas.

### Ramas de características (feature)

Para desarrollar nuevas funcionalidades, se crean ramas a partir de `develop` con el prefijo `feature/`. El nombre de la rama debe describir brevemente la funcionalidad a implementar.

Ejemplo:
```
feature/nueva-funcionalidad
```

### Ramas de corrección de errores (fix)

Para corregir errores encontrados, se crean ramas a partir de `develop` con el prefijo `fix/`. El nombre de la rama debe describir brevemente el error a corregir.

Ejemplo:
```
fix/error-en-login
```

### Ramas de hotfix

Para corregir errores críticos en la rama `main`, se crean ramas a partir de `main` con el prefijo `hotfix/`. El nombre de la rama debe describir brevemente el error crítico a corregir.

Ejemplo:
```
hotfix/correccion-critica
```

### Flujo de trabajo para mergear a develop

1. Crear una rama a partir de `develop` siguiendo las convenciones de nomenclatura mencionadas.
2. Realizar commits descriptivos siguiendo el formato y los emojis establecidos.
3. Hacer un pull request (PR) hacia `develop`.
4. El PR debe ser revisado y aprobado por al menos otro miembro del equipo antes de hacer merge.

---

Este README ahora incluye instrucciones claras sobre cómo nombrar y estructurar las nuevas ramas para mantener un flujo de trabajo ordenado.
