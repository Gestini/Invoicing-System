package productar.config;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class RequestLogger implements Filter {

    private static final Logger logger = LoggerFactory.getLogger(RequestLogger.class);

    @Value("${serverMode}")
    private Boolean serverMode;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (!serverMode) {
            chain.doFilter(request, response);
            return;
        }

        HttpServletRequest httpRequest = (HttpServletRequest) request;

        // Registrar detalles de la solicitud usando logger
        logger.info("==========================");
        logger.info("Request URI: {}", httpRequest.getRequestURI());
        logger.info("HTTP Method: {}", httpRequest.getMethod());
        logger.info("Client IP: {}", httpRequest.getRemoteAddr());
        logger.info("==========================");

        // Continuar con la cadena de filtros
        chain.doFilter(request, response);
    }

}
