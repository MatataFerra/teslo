import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const getFormatDistanceToNow = (date: string) => {
  const dateToCompare = new Date(date);
  const fromNow = formatDistanceToNow(dateToCompare, { locale: es });

  return `Orden creada hace ${fromNow}`;
};

export const getFormatDate = (date: string) => {
  const dateToCompare = new Date(date);
  const format = new Intl.DateTimeFormat("es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [{ value: day }, , { value: month }, , { value: year }] = format.formatToParts(dateToCompare);

  return `${day} de ${month} de ${year}`;
};
