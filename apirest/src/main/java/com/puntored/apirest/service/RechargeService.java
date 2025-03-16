package com.puntored.apirest.service;

import com.puntored.apirest.domain.entity.Recharge;
import com.puntored.apirest.domain.entity.User;
import com.puntored.apirest.domain.enums.RechargeStatus;
import com.puntored.apirest.dto.puntored.BuyRequestDTO;
import com.puntored.apirest.dto.puntored.BuyResponseDTO;
import com.puntored.apirest.dto.request.RechargeRequestDTO;
import com.puntored.apirest.dto.response.RechargeItemDTO;
import com.puntored.apirest.dto.response.RechargeResponseDTO;
import com.puntored.apirest.exception.BadRequestException;
import com.puntored.apirest.exception.PuntoredApiException;
import com.puntored.apirest.exception.ResourceNotFoundException;
import com.puntored.apirest.mapper.RechargeMapper;
import com.puntored.apirest.repository.RechargeRepository;
import com.puntored.apirest.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RechargeService {

    private final UserRepository userRepository;
    private final RechargeRepository rechargeRepository;
    private final PuntoRedService puntoRedService;

    public RechargeService(UserRepository userRepository, RechargeRepository rechargeRepository, PuntoRedService puntoRedService) {
        this.userRepository = userRepository;
        this.rechargeRepository = rechargeRepository;
        this.puntoRedService = puntoRedService;
    }

    public List<RechargeItemDTO> getRechargesByClientID(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findOneByEmail(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Recharge> recharges = rechargeRepository.findByClientId(user.getId());
        return RechargeMapper.fromRechargeListToRechargesListDTO(recharges);
    }

    @Transactional
    public RechargeResponseDTO createRecharge(RechargeRequestDTO rechargeRequestDTO){

        // Validate user
        User user = userRepository.findById(rechargeRequestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + rechargeRequestDTO.getUserId()));

        // validate supplier
        Optional<Recharge> existingRecharge = rechargeRepository.findFirstByCellphone(rechargeRequestDTO.getCellPhone());

        existingRecharge.ifPresent(recharge -> {
            if (!recharge.getSupplierId().equals(rechargeRequestDTO.getSupplierId())){
                throw new BadRequestException("This supplierId is not correct: "+rechargeRequestDTO.getSupplierId());
            }
        });

        // object BuyRequestDTO
        BuyRequestDTO buyRequestDTO = new BuyRequestDTO();
        buyRequestDTO.setCellPhone(rechargeRequestDTO.getCellPhone());
        buyRequestDTO.setValue(rechargeRequestDTO.getValue());
        buyRequestDTO.setSupplierId(rechargeRequestDTO.getSupplierId());

        //funciona el onErrorMap !!
        BuyResponseDTO buyResponseDTO = puntoRedService.buyRecharge(buyRequestDTO)
                .onErrorMap(error -> new PuntoredApiException("Error communication with PuntoRedAPI: "+error.getMessage()))
                .block();

        // create object Recharge
        Recharge recharge = new Recharge();
        recharge.setUser(user);
        recharge.setSupplierId(rechargeRequestDTO.getSupplierId());
        recharge.setCellPhone(rechargeRequestDTO.getCellPhone());
        recharge.setValue(rechargeRequestDTO.getValue());
        recharge.setTransactionalID(buyResponseDTO.getTransactionalID());
        recharge.setCreatedAt(LocalDateTime.now());
        recharge.setStatus(RechargeStatus.PAID);

        Recharge savedRecharge = rechargeRepository.save(recharge);

        // Mapping from Recharge to RechargeResponseDTO
        RechargeResponseDTO rechargeResponse = new RechargeResponseDTO();
        rechargeResponse.setId(savedRecharge.getId());
        rechargeResponse.setSupplierId(savedRecharge.getSupplierId());
        rechargeResponse.setCellPhone(savedRecharge.getCellPhone());
        rechargeResponse.setValue(savedRecharge.getValue());
        rechargeResponse.setMessage(buyResponseDTO.getMessage());
        rechargeResponse.setTransactionalID(savedRecharge.getTransactionalID());
        rechargeResponse.setStatus(savedRecharge.getStatus());

        return rechargeResponse;
    }


}
