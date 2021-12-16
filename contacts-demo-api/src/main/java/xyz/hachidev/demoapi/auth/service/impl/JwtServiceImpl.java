package xyz.hachidev.demoapi.auth.service.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import xyz.hachidev.demoapi.auth.db.entity.User;
import xyz.hachidev.demoapi.auth.service.JwtService;

import javax.validation.constraints.NotNull;
import java.time.*;
import java.util.Collections;
import java.util.Date;

@Service
public class JwtServiceImpl implements JwtService {
    private String secret = "s0m3pr1v@teKey";
    private String prefix = "Bearer ";
    private final Algorithm algorithm;

    public JwtServiceImpl() {
        algorithm = Algorithm.HMAC256(secret.getBytes());
    }


    public String generateToken(User user) {
        LocalDateTime now = LocalDateTime.now(ZoneId.of(ZoneOffset.UTC.toString()));
        Instant exp = now.plus(Duration.ofMinutes(120)).toInstant(ZoneOffset.UTC);
        return JWT.create()
                  .withSubject(user.getUsername())
                  .withClaim("id", user.getId())
                  .withExpiresAt(Date.from(exp))
                  .sign(algorithm);
    }

    public Authentication createAuthenticationFromToken(@NotNull String jwt) {
        String token = jwt.trim();
        if (!token.startsWith(this.prefix)) {
            throw new JWTDecodeException("Invalid token format. Token must start with \"" + this.prefix + "\"");
        }
        JWTVerifier verifier = JWT.require(algorithm).build();
        token = token.substring(this.prefix.length());
        verifier.verify(token);
        DecodedJWT decoded = JWT.decode(token);

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                decoded.getSubject(),
                token,
                Collections.emptyList()
        );
        return auth;
    }


}
