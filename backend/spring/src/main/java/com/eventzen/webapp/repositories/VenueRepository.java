package com.eventzen.webapp.repositories;

import com.eventzen.webapp.entities.Venue;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VenueRepository extends MongoRepository<Venue, String> {
    // Custom query methods can be added here if needed
    List<Venue> findByEventId(String eventId);
}