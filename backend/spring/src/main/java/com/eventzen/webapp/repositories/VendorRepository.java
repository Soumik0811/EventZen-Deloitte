package com.eventzen.webapp.repositories;

import com.eventzen.webapp.entities.Vendor;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorRepository extends MongoRepository<Vendor, String> {
    // Custom query methods can be added here if needed
    List<Vendor> findByEventId(String eventId);
}