package com.puntored.apirest.controller;

import com.puntored.apirest.dto.request.RechargeRequestDTO;
import com.puntored.apirest.dto.response.RechargeItemDTO;
import com.puntored.apirest.dto.response.RechargeResponseDTO;
import com.puntored.apirest.service.RechargeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("recharge")
public class RechargeController {

    private final RechargeService rechargeService;

    public RechargeController(RechargeService rechargeService) {
        this.rechargeService = rechargeService;
    }

    @PostMapping("/create")
    public ResponseEntity<RechargeResponseDTO> createRecharge(@RequestBody @Validated RechargeRequestDTO rechargeRequestDTO){
        RechargeResponseDTO rechargeResponseDTO = rechargeService.createRecharge(rechargeRequestDTO);
        return new ResponseEntity<>(rechargeResponseDTO, HttpStatus.CREATED);
    }

    @GetMapping("/getMyRecharges")
    public ResponseEntity<List<RechargeItemDTO>> getRechargesByClientID(){
        List<RechargeItemDTO> recharges = rechargeService.getRechargesByClientID();
        return ResponseEntity.ok(recharges);
    }
}
