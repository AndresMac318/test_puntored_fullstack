package com.puntored.apirest.domain.entity;

import com.puntored.apirest.domain.enums.RechargeStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "recharges")
public class Recharge {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private User user;

    @Column(name = "supplier_id", nullable = false)
    private String supplierId;

    @Column(name = "cellphone_number", nullable = false)
    private String cellPhone;

    @Column(name = "value", nullable = false)
    private Long value;

    @Column(name = "transactional_id", nullable = false)
    private String transactionalID;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private RechargeStatus status;

}
