import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: [true, 'Vendor name is required'],
      trim: true,
    },
    contactInfo: {
      type: String,
      required: [true, 'Contact information is required'],
      trim: true,
    },
    services: {
      type: [String], // Array of strings representing services offered
      required: false,
    },
    created_at: {
      type: Date,
      default: Date.now, // Automatically set to the current date/time
    },
    updated_at: {
      type: Date,
      default: Date.now, // Automatically set to the current date/time
    },
  },
  {
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
  }
);

// Middleware to update `updated_at` on save
vendorSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

// Create the Vendor Model
const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;