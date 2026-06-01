package com.admin.backend.admin_backend.role_interface;

import com.admin.backend.admin_backend.referentiel.Referentiel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
        name = "role_interface",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_role_interface",
                        columnNames = {"role_code_ref", "interface_code_ref"}
                )
        }
)
public class RoleInterface {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "role_code_ref", nullable = false)
    private Referentiel role;

    @ManyToOne(optional = false)
    @JoinColumn(name = "interface_code_ref", nullable = false)
    private Referentiel appInterface;
}