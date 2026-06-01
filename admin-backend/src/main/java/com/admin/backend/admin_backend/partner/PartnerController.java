package com.admin.backend.admin_backend.partner;

import com.admin.backend.admin_backend.partner.dto.PartnerRequest;
import com.admin.backend.admin_backend.partner.dto.PartnerResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/partners")
@RequiredArgsConstructor
public class PartnerController {

    private final PartnerService partnerService;

//    @GetMapping
//    public List<PartnerResponse> findAll() {
//        return partnerService.findAll();
//    }

    @GetMapping
    public List<PartnerResponse> findAll(
            @RequestParam(required = false) String type
    ) {
        return partnerService.findAll(type);
    }

    @GetMapping("/{id}")
    public PartnerResponse findById(@PathVariable Long id) {
        return partnerService.findById(id);
    }

    @PostMapping
    public PartnerResponse create(@Valid @RequestBody PartnerRequest request) {
        return partnerService.create(request);
    }

    @PutMapping("/{id}")
    public PartnerResponse update(
            @PathVariable Long id,
            @Valid @RequestBody PartnerRequest request
    ) {
        return partnerService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        partnerService.delete(id);
    }


}