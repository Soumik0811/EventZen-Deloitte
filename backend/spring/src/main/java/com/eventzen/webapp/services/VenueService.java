package com.eventzen.webapp.services;

import com.eventzen.webapp.entities.Venue;
import com.eventzen.webapp.repositories.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    public Venue getVenueById(String id) {
        return venueRepository.findById(id).orElse(null);
    }

    public List<Venue> getVenuesByEventId(String eventId) {
        return venueRepository.findByEventId(eventId);
    }

    public Venue createVenue(Venue venue) {
        return venueRepository.save(venue);
    }

    public Venue updateVenue(String id, Venue updatedVenue) {
        Venue existingVenue = venueRepository.findById(id).orElse(null);
        if (existingVenue != null) {
            existingVenue.setVenueName(updatedVenue.getVenueName());
            existingVenue.setCapacity(updatedVenue.getCapacity());
            existingVenue.setAmenities(updatedVenue.getAmenities());
            existingVenue.setPricing(updatedVenue.getPricing());
            existingVenue.setAddress(updatedVenue.getAddress());
            return venueRepository.save(existingVenue);
        }
        return null;
    }

    public void deleteVenue(String id) {
        venueRepository.deleteById(id);
    }
}