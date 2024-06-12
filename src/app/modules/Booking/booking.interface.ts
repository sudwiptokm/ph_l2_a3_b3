/* eslint-disable no-unused-vars */

// Booking Model:
// date: The date of the booking.
// user: Identifier for the user. (reference to user model)
// car: Identifier for the booked car. (reference to car model)
// startTime: The start time of the booking. The time will be in 24hr format.
// endTime: The end time of the booking. The time will be in 24hr format.
// totalCost: The total cost will be calculated using startTime, endTime and pricePerHour data. By default totalCost will be 0.
// isBooked: Indicates the booking status, whether it's unconfirmed or confirmed . By default, it will be unconfirmed.

import { Model, ObjectId } from 'mongoose';

// Create a Booking interface with the following fields
export interface TBooking {
  date: Date;
  user: ObjectId;
  car: ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
  isBooked: 'confirmed' | 'unconfirmed';
}

export interface BookingModel extends Model<TBooking> {
  isBookingExist(bookingId: string): Promise<TBooking>;
}
