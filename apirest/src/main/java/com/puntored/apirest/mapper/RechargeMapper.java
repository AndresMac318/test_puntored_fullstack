package com.puntored.apirest.mapper;


import com.puntored.apirest.domain.entity.Recharge;
import com.puntored.apirest.dto.response.RechargeItemDTO;

import java.util.List;

public class RechargeMapper {

    public static RechargeItemDTO fromRechargeToRechargeItemDTO(Recharge recharge){
        RechargeItemDTO rechargeItemDTO = new RechargeItemDTO();
        rechargeItemDTO.setId(recharge.getId());
        rechargeItemDTO.setSupplierId(recharge.getSupplierId());
        rechargeItemDTO.setCellPhone(recharge.getCellPhone());
        rechargeItemDTO.setValue(recharge.getValue());
        rechargeItemDTO.setTransactionalID(recharge.getTransactionalID());
        rechargeItemDTO.setCreatedAt(recharge.getCreatedAt());
        rechargeItemDTO.setStatus(recharge.getStatus());
        return rechargeItemDTO;
    }

    public static List<RechargeItemDTO> fromRechargeListToRechargesListDTO(List<Recharge> recharges){
        return recharges.stream()
                .map(recharge -> fromRechargeToRechargeItemDTO(recharge))
                .toList();
    }

}
