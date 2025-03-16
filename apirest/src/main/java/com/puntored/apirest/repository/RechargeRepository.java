package com.puntored.apirest.repository;

import com.puntored.apirest.domain.entity.Recharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RechargeRepository extends JpaRepository<Recharge, UUID> {

    @Query("SELECT r FROM Recharge r WHERE r.user.id = :clientId")
    List<Recharge> findByClientId(@Param("clientId") Long clientId);

    @Query("SELECT r FROM Recharge r WHERE cellPhone = :cellPhone ORDER BY r.id ASC")
    Optional<Recharge> findFirstByCellphone(@Param("cellPhone") String cellPhone);
}
