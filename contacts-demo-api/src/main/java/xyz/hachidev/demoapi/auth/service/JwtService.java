package xyz.hachidev.demoapi.auth.service;

import org.springframework.security.core.Authentication;
import xyz.hachidev.demoapi.auth.db.entity.User;

public interface JwtService {
    String generateToken(User user);

    Authentication createAuthenticationFromToken(String jwt);
}
