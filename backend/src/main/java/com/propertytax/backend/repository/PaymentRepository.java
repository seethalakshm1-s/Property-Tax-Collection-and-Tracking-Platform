
package com.propertytax.backend.repository;

import com.propertytax.backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    @Query(value = "SELECT p.* FROM payment p " +
            "JOIN tax_assessment ta ON p.assessment_id = ta.assessment_id " +
            "JOIN property pr ON ta.property_id = pr.property_id " +
            "WHERE pr.user_id = :userId", nativeQuery = true)
    List<Payment> findPaymentsByUserId(@Param("userId") Integer userId);
}

