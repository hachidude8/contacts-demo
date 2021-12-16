package xyz.hachidev.demoapi.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import xyz.hachidev.demoapi.auth.service.JwtService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JwtService jwtService;
    private String authenticationEndpoint = "/auth/login";
    private String[] publicEndpoints = {"/manage/**"};

    @Autowired
    public WebSecurityConfiguration(
            JwtService jwtService
    ) {
        this.jwtService = jwtService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.cors();
        http.csrf().disable();
        http.headers().frameOptions().disable();

        http.authorizeRequests()
            .antMatchers(HttpMethod.POST, authenticationEndpoint).permitAll()
            .antMatchers(publicEndpoints).permitAll()
            .anyRequest().authenticated();

        http.addFilter(createAuthorizationFilter());
    }

    private BasicAuthenticationFilter createAuthorizationFilter() throws Exception {
        return new JwtAuthorizationFilter(authenticationManager(), jwtService);
    }

}
