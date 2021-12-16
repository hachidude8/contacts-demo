package xyz.hachidev.demoapi.auth.service.impl;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import xyz.hachidev.demoapi.auth.db.entity.User;
import xyz.hachidev.demoapi.auth.dto.Credentials;
import xyz.hachidev.demoapi.auth.dto.TokenResponse;
import xyz.hachidev.demoapi.auth.service.AuthenticationService;
import xyz.hachidev.demoapi.auth.service.JwtService;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserDetailsService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthenticationServiceImpl(
            UserDetailsService userService,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public TokenResponse authenticate(Credentials credentials) {
        User user = (User) this.userService.loadUserByUsername(credentials.getUsername());
        boolean matches = passwordEncoder.matches(credentials.getPassword(), user.getPassword());
        if (!matches) {
            throw new BadCredentialsException("Invalid authentication credentials");
        }
        return new TokenResponse(this.jwtService.generateToken(user));
    }

}
