package com.puntored.apirest.dto.response;

import com.puntored.apirest.domain.enums.RechargeStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
public class RechargeItemDTO {

    private UUID id;
    private String supplierId;
    private String cellPhone;
    private Long value;
    private String transactionalID;
    private LocalDateTime createdAt;
    private RechargeStatus status;
}
