package xyz.hachidev.demoapi.auth.service.impl;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import xyz.hachidev.demoapi.auth.db.entity.User;
import xyz.hachidev.demoapi.auth.db.repository.UserRepository;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, BadCredentialsException {
        Optional<User> user = this.userRepository.findByUsername(username);
        return user.orElseThrow(() -> new BadCredentialsException("Invalid authentication credentials"));
    }
}
