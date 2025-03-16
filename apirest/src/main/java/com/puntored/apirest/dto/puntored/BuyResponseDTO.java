package com.puntored.apirest.dto.puntored;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BuyResponseDTO {

    private String message;
    private String transactionalID;
    private String cellPhone;
    private Long value;
}
