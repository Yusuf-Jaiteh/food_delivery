package learn.security;

import learn.data.UserRepository;
import learn.models.AppUser;
import learn.models.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppUserService implements UserDetailsService {

    private final UserRepository userRepository;

    public AppUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username);
        AppUser appUser = new AppUser();
        appUser.setUsername(user.get().getEmail());
        appUser.setPassword(user.get().getPassword());
        appUser.setAppUserId(Integer.parseInt(user.get().getId().toString()));
        appUser.setAuthorities(List.of(user.get().getRole().toString()));
        if (appUser == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return appUser;
    }
}
