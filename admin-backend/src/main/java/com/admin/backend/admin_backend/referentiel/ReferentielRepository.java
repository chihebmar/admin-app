package com.admin.backend.admin_backend.referentiel;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReferentielRepository extends JpaRepository<Referentiel, String> {

    List<Referentiel> findByTypeCodeRefTypeAndActiveTrue(String codeRefType);
}