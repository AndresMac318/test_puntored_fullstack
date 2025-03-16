package com.puntored.apirest.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RechargeRequestDTO {

    @NotNull(message = "userId is mandatory")
    private Long userId;

    @NotNull(message = "supplierId  is mandatory")
    private String supplierId;

    @Size(min = 10, max = 10, message = "Cellphone must be exactly 10 digits")
    @Pattern(regexp = "^3\\d{9}$", message = "Cellphone must start with '3' and contain only numbers")
    @NotNull(message = "cellphone is mandatory")
    private String cellPhone;

    @Min(value = 1000, message = "Value must be greater than 1000")
    @Max(value = 100000, message = "Value must be lower than 100000")
    @NotNull(message = "value is mandatory")
    private Long value;
}
