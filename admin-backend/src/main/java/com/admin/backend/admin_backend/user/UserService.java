package com.admin.backend.admin_backend.user;

import com.admin.backend.admin_backend.common.exception.ResourceNotFoundException;
import com.admin.backend.admin_backend.referentiel.Referentiel;
import com.admin.backend.admin_backend.referentiel.ReferentielRepository;
import com.admin.backend.admin_backend.user.dto.UserRequest;
import com.admin.backend.admin_backend.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import org.springframework.data.domain.Page;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ReferentielRepository referentielRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserResponse> findAll() {
        return userRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public UserResponse create(UserRequest request) {
        Referentiel role = getReferentiel(request.roleCodeRef());
        Referentiel status = getReferentiel(request.statusCodeRef());

        User user = new User();
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(role);
        user.setStatus(status);
        user.setCreatedAt(Instant.now());

        return toResponse(userRepository.save(user));
    }

    public UserResponse update(Long id, UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email());
        user.setRole(getReferentiel(request.roleCodeRef()));
        user.setStatus(getReferentiel(request.statusCodeRef()));
        user.setUpdatedAt(Instant.now());

        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }

        return toResponse(userRepository.save(user));
    }

    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userRepository.delete(user);
    }

    private Referentiel getReferentiel(String codeRef) {
        return referentielRepository.findById(codeRef)
                .orElseThrow(() -> new ResourceNotFoundException("Referentiel not found: " + codeRef));
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole().getCodeRef(),
                user.getRole().getLabelFr(),
                user.getRole().getLabelEn(),
                user.getStatus().getCodeRef(),
                user.getStatus().getLabelFr(),
                user.getStatus().getLabelEn()
        );
    }

    public Page<UserResponse> findPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return userRepository.findAll(pageable)
                .map(this::toResponse);
    }
}