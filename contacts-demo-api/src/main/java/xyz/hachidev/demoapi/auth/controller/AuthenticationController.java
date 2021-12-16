package xyz.hachidev.demoapi.auth.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import xyz.hachidev.demoapi.auth.dto.Credentials;
import xyz.hachidev.demoapi.auth.dto.TokenResponse;
import xyz.hachidev.demoapi.auth.service.AuthenticationService;

@RestController()
public class AuthenticationController {

    private final AuthenticationService authService;

    @Autowired
    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<TokenResponse> login(
            @RequestBody Credentials credentials
    ) {
        return ResponseEntity.ok(
                this.authService.authenticate(credentials)
        );
    }
}
