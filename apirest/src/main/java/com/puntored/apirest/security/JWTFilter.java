package com.puntored.apirest.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class JWTFilter extends GenericFilterBean {

    private final TokenProvider tokenProvider;

    public JWTFilter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;

        //extrae el token JWT: Obtiene el token de la cabecera de autorizacion de la solicitud HTTP.
        String bearerToken = httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);

        // Verifica y procesa el token: Si el token es válido, se obtiene la autenticacion del usuario a partir del
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            String token = bearerToken.substring(7);

            // establece la autenticacion en el contexto de seguridad: configura la autenticacion en el contextode
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // continua con la cadena de filtros: permite que la solicitud siga su curso en la cadena de filtros de Spring
        chain.doFilter(request, response);
    }
}
