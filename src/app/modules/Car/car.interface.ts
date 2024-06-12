/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TCar {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status?: 'available' | 'unavailable';
  features: string[];
  pricePerHour: number;
  isDeleted?: boolean;
}

export interface CarModel extends Model<TCar> {
  isCarExist(carId: string): Promise<TCar>;
}
