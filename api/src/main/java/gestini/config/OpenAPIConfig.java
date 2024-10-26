package gestini.config;

import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.parameters.Parameter;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class OpenAPIConfig {

  @Bean
  public OpenAPI customOpenAPI() {
    final String securitySchemeName = "BearerAuth";

    return new OpenAPI()
        .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
        .components(
            new Components()
                .addSecuritySchemes(securitySchemeName,
                    new SecurityScheme()
                        .name(securitySchemeName)
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")))
        .info(new Info().title("Gestini").version("1.0.0"));
  }

  @Bean
  public OperationCustomizer customizeOperation() {
    return (operation, handlerMethod) -> {
      if (operation.getSecurity() != null && operation.getSecurity().stream()
          .anyMatch(securityRequirement -> securityRequirement.containsKey("UnitAccess"))) {

        Parameter unitIdHeader = new Parameter()
            .in("header")
            .name("X-UnitId")
            .required(true)
            .description("Required unit ID for access control")
            .schema(new io.swagger.v3.oas.models.media.StringSchema());

        operation.addParametersItem(unitIdHeader);
      }
      return operation;
    };
  }
}
