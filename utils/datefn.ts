import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const getFormatDistanceToNow = (date: string) => {
  const dateToCompare = new Date(date);
  const fromNow = formatDistanceToNow(dateToCompare, { locale: es });

  return `Orden creada hace ${fromNow}`;
};
