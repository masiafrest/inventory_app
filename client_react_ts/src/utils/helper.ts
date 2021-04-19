export const capitalizeFirstChart = (name: string): string =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const deleteSlashChart = (name: string): string => name.slice(1);

export const checkObjValues = (obj) => {
  return Object.values(obj).some((e) => !e);
};
