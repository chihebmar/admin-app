package com.admin.backend.admin_backend.referentiel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "referentiel_type")
public class ReferentielType {

    @Id
    @Column(name = "code_ref_type", length = 50, nullable = false)
    private String codeRefType;

    @Column(name = "label_fr", length = 150, nullable = false)
    private String labelFr;

    @Column(name = "label_en", length = 150, nullable = false)
    private String labelEn;

    @Column(name = "description", length = 255)
    private String description;
}