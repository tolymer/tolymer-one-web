import { Date as DateType } from './tolymer_pb';
import dayjs, { Dayjs } from 'dayjs';

export function dateToProto(val: string): DateType {
  const [year, month, day] = val.split('-');
  const d = new DateType();
  d.setYear(Number(year));
  d.setMonth(Number(month));
  d.setDay(Number(day));
  return d;
}

export function protoToDate(val): Dayjs {
  return dayjs(new Date(val.year, val.month - 1, val.day));
}
