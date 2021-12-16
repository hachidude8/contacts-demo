package xyz.hachidev.demoapi.auth.security;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import xyz.hachidev.demoapi.auth.service.JwtService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private final JwtService jwtService;

    public JwtAuthorizationFilter(
            AuthenticationManager authenticationManager,
            JwtService jwtService
    ) {
        super(authenticationManager);
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {
        Authentication auth = buildAuthenticationFromRequest(request);
        if (auth != null) {
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        chain.doFilter(request, response);
    }

    private Authentication buildAuthenticationFromRequest(HttpServletRequest request) {
        String token = this.getToken(request);
        if (token == null) {
            return null;
        }
        return jwtService.createAuthenticationFromToken(token);
    }

    private String getToken(HttpServletRequest request) {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header == null || header.trim().equals("")) {
            return null;
        }
        return header;
    }
}
