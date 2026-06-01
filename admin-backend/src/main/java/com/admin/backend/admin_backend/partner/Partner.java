package com.admin.backend.admin_backend.partner;

import com.admin.backend.admin_backend.referentiel.Referentiel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "partner")
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false, unique = true, length = 80)
    private String code;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "email", length = 150)
    private String email;

    @Column(name = "phone", length = 50)
    private String phone;

    @Column(name = "address", length = 255)
    private String address;

    @ManyToOne(optional = false)
    @JoinColumn(name = "type_code_ref", nullable = false)
    private Referentiel type;

    @ManyToOne(optional = false)
    @JoinColumn(name = "status_code_ref", nullable = false)
    private Referentiel status;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;
}