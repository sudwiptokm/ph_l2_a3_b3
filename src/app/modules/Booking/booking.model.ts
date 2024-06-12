import { Query, Schema, model } from 'mongoose';
import { Car } from '../Car/car.model';
import { User } from '../User/user.model';
import { BookingModel, TBooking } from './booking.interface';
import { timeFormatValidator } from './booking.utils';

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: [true, 'Car is required'],
    },
    startTime: {
      type: String,
      validate: timeFormatValidator,
    },
    endTime: {
      type: String || null,
      validate: timeFormatValidator,
    },
    totalCost: {
      type: Number,
      required: [true, 'Total cost is required'],
    },
    isBooked: {
      type: String,
      enum: ['confirmed', 'unconfirmed'],
      default: 'unconfirmed',
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.id;
      },
    },
    timestamps: true,
  },
);

// Middleware to check if the referenced user and car exist
// eslint-disable-next-line no-unused-vars
bookingSchema.pre('save', async function (next: (err?: Error) => void) {
  const booking = this as TBooking;

  // Check if the user exists
  const user = await User.findById(booking.user);
  if (!user) {
    return next(new Error('Referenced user does not exist.'));
  }

  // Check if the car exists
  const car = await Car.findById(booking.car);
  if (!car) {
    return next(new Error('Referenced car does not exist.'));
  }

  next();
});

// Middleware to populate the user and car fields on find

bookingSchema.pre(
  /^find/,
  function (this: Query<unknown, TBooking>, next: () => void) {
    this.populate('user').populate('car');
    next();
  },
);

bookingSchema.statics.isBookingExist = async function (bookingId: string) {
  return this.findById({ _id: bookingId });
};

export const Booking = model<TBooking, BookingModel>('Booking', bookingSchema);
