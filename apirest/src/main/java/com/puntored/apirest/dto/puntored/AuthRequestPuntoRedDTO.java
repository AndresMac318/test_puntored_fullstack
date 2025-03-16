package com.puntored.apirest.dto.puntored;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class AuthRequestPuntoRedDTO {

    private String user;
    private String password;

}
