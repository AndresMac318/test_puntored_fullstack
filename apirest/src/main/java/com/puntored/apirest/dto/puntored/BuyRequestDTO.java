package com.puntored.apirest.dto.puntored;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BuyRequestDTO {

    private String cellPhone;
    private Long value;
    private String supplierId;
}
