package com.puntored.apirest.service;

import com.puntored.apirest.dto.puntored.AuthRequestPuntoRedDTO;
import com.puntored.apirest.dto.puntored.AuthResponsePuntoRedDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class PuntoRedAuthService {

    @Value("${url-base-puntored}")
    private String urlBasePuntored;

    @Value("${apikey-puntored}")
    private String apiKey;

    @Value("${user-puntored}")
    private String user;

    @Value("${password-puntored}")
    private String password;

    private final WebClient webClient;

    public PuntoRedAuthService(WebClient webClient) {
        this.webClient = webClient;
    }

    @Cacheable(value = "puntoredTokenCache", key = "'puntoredToken'")
    public Mono<String> getAuthToken() {
        return webClient.post()
            .uri(urlBasePuntored + "/auth")
            .header("x-api-key", apiKey)
            .bodyValue(new AuthRequestPuntoRedDTO(user, password))
            .retrieve()
            .bodyToMono(AuthResponsePuntoRedDTO.class)
            .map(AuthResponsePuntoRedDTO::getToken);
    }

    @CacheEvict(value = "puntoredTokenCache", key = "'puntoredToken'")
    @Scheduled(fixedRate = 7 * 24 * 60 * 60 * 1000) // 7 days
    public void evictTokenCache(){
    }
}
