package com.eventzen.webapp.controller;

import com.eventzen.webapp.entities.Venue;
import com.eventzen.webapp.services.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/venues")
public class VenueController {

    @Autowired
    private VenueService venueService;

    @GetMapping
    public ResponseEntity<List<Venue>> getAllVenues() {
        return ResponseEntity.ok(venueService.getAllVenues());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(@PathVariable String id) {
        Venue venue = venueService.getVenueById(id);
        return venue != null ? ResponseEntity.ok(venue) : ResponseEntity.notFound().build();
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Venue>> getVenuesByEventId(@PathVariable String eventId) {
        return ResponseEntity.ok(venueService.getVenuesByEventId(eventId));
    }
    
    @PostMapping
    public ResponseEntity<Venue> createVenue(@RequestBody Venue venue) {
        return ResponseEntity.ok(venueService.createVenue(venue));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Venue> updateVenue(@PathVariable String id, @RequestBody Venue updatedVenue) {
        Venue venue = venueService.updateVenue(id, updatedVenue);
        return venue != null ? ResponseEntity.ok(venue) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVenue(@PathVariable String id) {
        venueService.deleteVenue(id);
        return ResponseEntity.noContent().build();
    }
}