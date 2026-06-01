package com.admin.backend.admin_backend.partner;

import com.admin.backend.admin_backend.common.exception.ResourceNotFoundException;
import com.admin.backend.admin_backend.partner.dto.PartnerRequest;
import com.admin.backend.admin_backend.partner.dto.PartnerResponse;
import com.admin.backend.admin_backend.referentiel.Referentiel;
import com.admin.backend.admin_backend.referentiel.ReferentielRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PartnerService {

    private final PartnerRepository partnerRepository;
    private final ReferentielRepository referentielRepository;

    public List<PartnerResponse> findAll() {
        return partnerRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public PartnerResponse findById(Long id) {
        return toResponse(getPartner(id));
    }

    public PartnerResponse create(PartnerRequest request) {
        Partner partner = new Partner();

        partner.setCode(request.code());
        partner.setName(request.name());
        partner.setEmail(request.email());
        partner.setPhone(request.phone());
        partner.setAddress(request.address());

        partner.setType(getReferentiel(request.typeCodeRef()));
        partner.setStatus(getReferentiel(request.statusCodeRef()));

        partner.setCreatedAt(Instant.now());

        return toResponse(partnerRepository.save(partner));
    }

    public PartnerResponse update(Long id, PartnerRequest request) {
        Partner partner = getPartner(id);

        partner.setCode(request.code());
        partner.setName(request.name());
        partner.setEmail(request.email());
        partner.setPhone(request.phone());
        partner.setAddress(request.address());

        partner.setType(getReferentiel(request.typeCodeRef()));
        partner.setStatus(getReferentiel(request.statusCodeRef()));

        partner.setUpdatedAt(Instant.now());

        return toResponse(partnerRepository.save(partner));
    }

    public void delete(Long id) {
        Partner partner = getPartner(id);

        partnerRepository.delete(partner);
    }

    private Partner getPartner(Long id) {
        return partnerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Partner not found"));
    }

    private Referentiel getReferentiel(String codeRef) {
        return referentielRepository.findById(codeRef)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Referentiel not found: " + codeRef));
    }

    private PartnerResponse toResponse(Partner partner) {
        return new PartnerResponse(
                partner.getId(),
                partner.getCode(),
                partner.getName(),
                partner.getEmail(),
                partner.getPhone(),
                partner.getAddress(),

                partner.getType().getCodeRef(),
                partner.getType().getLabelFr(),
                partner.getType().getLabelEn(),

                partner.getStatus().getCodeRef(),
                partner.getStatus().getLabelFr(),
                partner.getStatus().getLabelEn()
        );
    }
    public List<PartnerResponse> findAll(String typeCodeRef) {
        if (typeCodeRef != null && !typeCodeRef.isBlank()) {
            return partnerRepository.findByType_CodeRef(typeCodeRef)
                    .stream()
                    .map(this::toResponse)
                    .toList();
        }

        return partnerRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }
}