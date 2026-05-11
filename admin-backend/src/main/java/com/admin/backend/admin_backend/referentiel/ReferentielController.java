package com.admin.backend.admin_backend.referentiel;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/referentiels")
@RequiredArgsConstructor
public class ReferentielController {

    private final ReferentielService referentielService;

    @GetMapping("/type/{codeRefType}")
    public List<ReferentielResponse> getByType(@PathVariable String codeRefType) {
        return referentielService.getActiveReferentielsByType(codeRefType);
    }
}