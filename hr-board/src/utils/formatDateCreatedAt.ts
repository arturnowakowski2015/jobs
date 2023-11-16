import dayjs from 'dayjs';

export const formatDateCreatedAt = (dateIso: string) => {
  return dayjs(dateIso).format('DD-MM-YYYY');
};
