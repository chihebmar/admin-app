package com.admin.backend.admin_backend.referentiel;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReferentielService {

    private final ReferentielRepository referentielRepository;

    public List<ReferentielResponse> getActiveReferentielsByType(String codeRefType) {
        return referentielRepository
                .findByTypeCodeRefTypeAndActiveTrue(codeRefType)
                .stream()
                .map(ReferentielResponse::fromEntity)
                .toList();
    }
}