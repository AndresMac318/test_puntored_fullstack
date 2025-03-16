package com.puntored.apirest.service;

import com.puntored.apirest.dto.puntored.BuyRequestDTO;
import com.puntored.apirest.dto.puntored.BuyResponseDTO;
import com.puntored.apirest.dto.puntored.SupplierResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class PuntoRedService {

    @Value("${url-base-puntored}")
    private String urlBasePuntored;

    private final WebClient webClient;
    private final PuntoRedAuthService authService;

    public PuntoRedService(WebClient webClient, PuntoRedAuthService authService) {
        this.webClient = webClient;
        this.authService = authService;
    }

    public Mono<List<SupplierResponseDTO>> getSuppliers() {
        return authService.getAuthToken()
            .flatMap(token -> webClient.get()
                .uri(urlBasePuntored + "/getSuppliers")
                .header("Authorization", token)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<SupplierResponseDTO>>() {})
            );
    }

    public Mono<BuyResponseDTO> buyRecharge(BuyRequestDTO buyRequestDTO){
        return authService.getAuthToken()
            .flatMap(token -> webClient.post()
                .uri(urlBasePuntored+"/buy")
                .header("Authorization", token)
                .bodyValue(buyRequestDTO)
                .retrieve()
                .bodyToMono(BuyResponseDTO.class)
            );
    }
}
