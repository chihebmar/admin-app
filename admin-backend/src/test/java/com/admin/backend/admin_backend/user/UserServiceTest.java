package com.admin.backend.admin_backend.user;

import com.admin.backend.admin_backend.referentiel.Referentiel;
import com.admin.backend.admin_backend.referentiel.ReferentielRepository;
import com.admin.backend.admin_backend.user.dto.UserRequest;
import com.admin.backend.admin_backend.user.dto.UserResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.mockito.Mockito;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ReferentielRepository referentielRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldCreateUserSuccessfully() {
        // Given
        UserRequest request = new UserRequest(
                "Chiheb",
                "Marzougui",
                "chiheb@test.com",
                "password123",
                "ROLE_ADMIN",
                "USER_ACTIVE"
        );

        Referentiel role = new Referentiel();
        role.setCodeRef("ROLE_ADMIN");
        role.setLabelFr("Administrateur");
        role.setLabelEn("Administrator");

        Referentiel status = new Referentiel();
        status.setCodeRef("USER_ACTIVE");
        status.setLabelFr("Actif");
        status.setLabelEn("Active");

        when(referentielRepository.findById("ROLE_ADMIN"))
                .thenReturn(Optional.of(role));

        when(referentielRepository.findById("USER_ACTIVE"))
                .thenReturn(Optional.of(status));

        when(passwordEncoder.encode("password123"))
                .thenReturn("encoded-password");

        when(userRepository.save(Mockito.<User>any()))
                .thenAnswer(invocation -> {
                    User savedUser = invocation.getArgument(0);
                    savedUser.setId(1L);
                    return savedUser;
                });

        // When
        UserResponse response = userService.create(request);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.firstName()).isEqualTo("Chiheb");
        assertThat(response.lastName()).isEqualTo("Marzougui");
        assertThat(response.email()).isEqualTo("chiheb@test.com");
        assertThat(response.roleCodeRef()).isEqualTo("ROLE_ADMIN");
        assertThat(response.statusCodeRef()).isEqualTo("USER_ACTIVE");

        verify(passwordEncoder).encode("password123");
        verify(referentielRepository).findById("ROLE_ADMIN");
        verify(referentielRepository).findById("USER_ACTIVE");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void shouldSaveUserWithEncodedPassword() {
        // Given
        UserRequest request = new UserRequest(
                "Chiheb",
                "Marzougui",
                "chiheb@test.com",
                "password123",
                "ROLE_ADMIN",
                "USER_ACTIVE"
        );

        Referentiel role = new Referentiel();
        role.setCodeRef("ROLE_ADMIN");
        role.setLabelFr("Administrateur");
        role.setLabelEn("Administrator");

        Referentiel status = new Referentiel();
        status.setCodeRef("USER_ACTIVE");
        status.setLabelFr("Actif");
        status.setLabelEn("Active");

        when(referentielRepository.findById("ROLE_ADMIN"))
                .thenReturn(Optional.of(role));

        when(referentielRepository.findById("USER_ACTIVE"))
                .thenReturn(Optional.of(status));

        when(passwordEncoder.encode("password123"))
                .thenReturn("encoded-password");

        when(userRepository.save(any()))
                .thenAnswer(invocation -> invocation.getArgument(0));

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);

        // When
        userService.create(request);

        // Then
        verify(userRepository).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();

        assertThat(savedUser.getPassword()).isEqualTo("encoded-password");
        assertThat(savedUser.getCreatedAt()).isNotNull();
    }
}