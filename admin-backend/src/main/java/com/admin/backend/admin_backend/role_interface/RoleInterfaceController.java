package com.admin.backend.admin_backend.role_interface;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/role-interfaces")
@RequiredArgsConstructor
public class RoleInterfaceController {

    private final RoleInterfaceService roleInterfaceService;

    @GetMapping("/my-interfaces")
    public List<String> getMyInterfaces(Authentication authentication) {
        return roleInterfaceService.getMyInterfaceCodes(authentication);
    }

    @GetMapping("/roles/{roleCodeRef}")
    public List<String> getByRole(@PathVariable String roleCodeRef) {
        return roleInterfaceService.getInterfaceCodesByRole(roleCodeRef);
    }

    @PutMapping("/roles/{roleCodeRef}")
    public List<String> updateRoleInterfaces(
            @PathVariable String roleCodeRef,
            @RequestBody List<String> interfaceCodes
    ) {
        return roleInterfaceService.updateRoleInterfaces(roleCodeRef, interfaceCodes);
    }
}