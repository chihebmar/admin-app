package com.admin.backend.admin_backend.referentiel;

public record ReferentielResponse(
        String codeRef,
        String labelFr,
        String labelEn,
        String value
) {
    public static ReferentielResponse fromEntity(Referentiel referentiel) {
        return new ReferentielResponse(
                referentiel.getCodeRef(),
                referentiel.getLabelFr(),
                referentiel.getLabelEn(),
                referentiel.getValue()
        );
    }
}