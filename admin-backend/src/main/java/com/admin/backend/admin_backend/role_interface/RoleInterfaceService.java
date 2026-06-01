package com.admin.backend.admin_backend.role_interface;

import com.admin.backend.admin_backend.common.exception.ResourceNotFoundException;
import com.admin.backend.admin_backend.referentiel.Referentiel;
import com.admin.backend.admin_backend.referentiel.ReferentielRepository;
import com.admin.backend.admin_backend.user.User;
import com.admin.backend.admin_backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleInterfaceService {

    private final UserRepository userRepository;
    private final RoleInterfaceRepository roleInterfaceRepository;
    private final ReferentielRepository referentielRepository;

    public List<String> getMyInterfaceCodes(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return getInterfaceCodesByRole(user.getRole().getCodeRef());
    }

    public List<String> getInterfaceCodesByRole(String roleCodeRef) {
        return roleInterfaceRepository
                .findByRole_CodeRef(roleCodeRef)
                .stream()
                .map(roleInterface -> roleInterface.getAppInterface().getCodeRef())
                .toList();
    }

    @Transactional
    public List<String> updateRoleInterfaces(String roleCodeRef, List<String> interfaceCodes) {
        Referentiel role = referentielRepository.findById(roleCodeRef)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleCodeRef));

        roleInterfaceRepository.deleteByRole_CodeRef(roleCodeRef);

        for (String interfaceCode : interfaceCodes) {
            Referentiel appInterface = referentielRepository.findById(interfaceCode)
                    .orElseThrow(() -> new ResourceNotFoundException("Interface not found: " + interfaceCode));

            RoleInterface roleInterface = new RoleInterface();
            roleInterface.setRole(role);
            roleInterface.setAppInterface(appInterface);

            roleInterfaceRepository.save(roleInterface);
        }

        return getInterfaceCodesByRole(roleCodeRef);
    }
}