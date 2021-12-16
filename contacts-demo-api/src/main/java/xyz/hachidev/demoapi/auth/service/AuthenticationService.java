package xyz.hachidev.demoapi.auth.service;

import xyz.hachidev.demoapi.auth.dto.Credentials;
import xyz.hachidev.demoapi.auth.dto.TokenResponse;

public interface AuthenticationService {
    TokenResponse authenticate(Credentials credentials);
}
