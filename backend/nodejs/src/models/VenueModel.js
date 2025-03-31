import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    venueName: {
      type: String,
      required: [true, 'Venue name is required'],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, 'Venue capacity is required'],
      min: [1, 'Capacity must be at least 1'],
    },
    amenities: {
      type: [String], // Array of strings representing amenities
      required: false,
    },
    pricing: {
      type: Number,
      required: [true, 'Venue pricing is required'],
      min: [0, 'Pricing cannot be negative'],
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
venueSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

// Create the Venue Model
const Venue = mongoose.model('Venue', venueSchema);

export default Venue;