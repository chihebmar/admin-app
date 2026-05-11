package com.admin.backend.admin_backend.referentiel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "referentiel")
public class Referentiel {

    @Id
    @Column(name = "code_ref", length = 80, nullable = false)
    private String codeRef;

    @Column(name = "label_fr", length = 150, nullable = false)
    private String labelFr;

    @Column(name = "label_en", length = 150, nullable = false)
    private String labelEn;

    @Column(name = "value", length = 255)
    private String value;

    @Column(name = "active", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean active = true;

    @ManyToOne(optional = false)
    @JoinColumn(name = "code_ref_type", nullable = false)
    private ReferentielType type;
}
