package com.puntored.apirest.controller;

import com.puntored.apirest.dto.puntored.SupplierResponseDTO;
import com.puntored.apirest.service.PuntoRedService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/puntored")
public class PuntoRedController {

    private final PuntoRedService puntoRedService;

    public PuntoRedController(PuntoRedService puntoRedService) {
        this.puntoRedService = puntoRedService;
    }

    @GetMapping("/getSuppliers")
    public Mono<List<SupplierResponseDTO>> getSuppliers() {
        return puntoRedService.getSuppliers();
    }
}
