package learn.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import learn.models.AppUser;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JwtFilter extends BasicAuthenticationFilter {

    private final JwtConverter jwtConverter;

    public JwtFilter(AuthenticationManager authenticationManager, JwtConverter jwtConverter) {
        super(authenticationManager);
        this.jwtConverter = jwtConverter;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {

        String authorization = request.getHeader("Authorization");
        if (authorization != null && authorization.startsWith(("Bearer "))) {
            AppUser user = jwtConverter.getUserFromToken(authorization);
            if (user == null) {
                response.setStatus(403); // Forbidden
            } else {
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                        user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(token);
            }
        }
        chain.doFilter(request, response);
    }
}
