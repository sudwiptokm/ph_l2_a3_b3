export const timeFormatValidator = {
  validator: function (v: string | null) {
    if (!v) {
      return true;
    }
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
  },
  message: (props: { value: string }) =>
    `${props.value} is not a valid 24-hour time format!`,
};

export const convertTimeToHours = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours + minutes / 60;
};

export interface BookingFilters {
  car?: string;
  date?: Date;
}
