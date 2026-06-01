package com.admin.backend.admin_backend.role_interface;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleInterfaceRepository extends JpaRepository<RoleInterface, Long> {

    List<RoleInterface> findByRole_CodeRef(String codeRef);
    void deleteByRole_CodeRef(String roleCodeRef);


}