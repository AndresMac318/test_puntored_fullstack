package com.puntored.apirest.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class AuthResponseDTO {
    private String token;
    private UserProfileResponseDTO user;
}
