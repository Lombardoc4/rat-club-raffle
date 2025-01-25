import moment from 'moment-timezone';

export const validateStartDate = (start: string) => {
  return moment(start).isAfter(moment());
};

export const validateEndDate = (end: string, start?: string) => {
  if (!start) {
    return false;
  }

  const startDate = moment(start);
  const endDate = moment(end);

  return moment(endDate).isAfter(moment(startDate));
};

export const validateDrawingDate = (
  drawing: string,
  start?: string,
  end?: string,
) => {
  if (!start || !end) {
    return false;
  }

  const startDate = moment(start);
  const endDate = moment(end);
  const drawingDate = moment(drawing);

  return (
    moment(drawingDate).isAfter(moment(startDate)) &&
    moment(drawingDate).isAfter(moment(endDate))
  );
};
