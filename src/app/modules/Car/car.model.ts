import { Query, Schema, model } from 'mongoose';
import { CarModel, TCar } from './car.interface';

const carSchema = new Schema<TCar>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    color: {
      type: String,
      required: [true, 'Color is required'],
    },
    isElectric: {
      type: Boolean,
      required: [true, 'Electric status is required'],
    },
    status: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    features: {
      type: [String],
      required: [true, 'Features is required'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
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

const applyIsDeletedCheck = function (
  this: Query<unknown, Document>,
  next: () => void,
) {
  this.where({ isDeleted: { $ne: true } });
  next();
};

carSchema.pre(/^find/, applyIsDeletedCheck);

carSchema.statics.isCarExist = async function (carId: string) {
  return this.findById({ _id: carId });
};

export const Car = model<TCar, CarModel>('Car', carSchema);
