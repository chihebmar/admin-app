package com.admin.backend.admin_backend.partner;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartnerRepository extends JpaRepository<Partner, Long> {

    List<Partner> findByType_CodeRef(String typeCodeRef);

}