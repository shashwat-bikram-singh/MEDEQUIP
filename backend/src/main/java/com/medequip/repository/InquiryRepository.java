package com.medequip.repository;

import com.medequip.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {

    List<Inquiry> findByTypeOrderByCreatedAtDesc(String type);

    List<Inquiry> findAllByOrderByCreatedAtDesc();

    long countByStatus(String status);
}
