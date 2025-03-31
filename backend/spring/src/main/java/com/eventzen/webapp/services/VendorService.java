package com.eventzen.webapp.services;

import com.eventzen.webapp.entities.Vendor;
import com.eventzen.webapp.repositories.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    public Vendor getVendorById(String id) {
        return vendorRepository.findById(id).orElse(null);
    }

    public List<Vendor> getVendorsByEventId(String eventId) {
        return vendorRepository.findByEventId(eventId);
    }

    public Vendor createVendor(Vendor vendor) {
        return vendorRepository.save(vendor);
    }

    public Vendor updateVendor(String id, Vendor updatedVendor) {
        Vendor existingVendor = vendorRepository.findById(id).orElse(null);
        if (existingVendor != null) {
            existingVendor.setVendorName(updatedVendor.getVendorName());
            existingVendor.setContactInfo(updatedVendor.getContactInfo());
            existingVendor.setServices(updatedVendor.getServices());
            return vendorRepository.save(existingVendor);
        }
        return null;
    }

    public void deleteVendor(String id) {
        vendorRepository.deleteById(id);
    }
}