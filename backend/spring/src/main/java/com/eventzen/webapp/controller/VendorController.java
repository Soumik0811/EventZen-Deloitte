package com.eventzen.webapp.controller;

import com.eventzen.webapp.entities.Vendor;
import com.eventzen.webapp.services.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @GetMapping
    public ResponseEntity<List<Vendor>> getAllVendors() {
        return ResponseEntity.ok(vendorService.getAllVendors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vendor> getVendorById(@PathVariable String id) {
        Vendor vendor = vendorService.getVendorById(id);
        return vendor != null ? ResponseEntity.ok(vendor) : ResponseEntity.notFound().build();
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Vendor>> getVendorsByEventId(@PathVariable String eventId) {
        return ResponseEntity.ok(vendorService.getVendorsByEventId(eventId));
    }

    @PostMapping
    public ResponseEntity<Vendor> createVendor(@RequestBody Vendor vendor) {
        return ResponseEntity.ok(vendorService.createVendor(vendor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vendor> updateVendor(@PathVariable String id, @RequestBody Vendor updatedVendor) {
        Vendor vendor = vendorService.updateVendor(id, updatedVendor);
        return vendor != null ? ResponseEntity.ok(vendor) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendor(@PathVariable String id) {
        vendorService.deleteVendor(id);
        return ResponseEntity.noContent().build();
    }
}