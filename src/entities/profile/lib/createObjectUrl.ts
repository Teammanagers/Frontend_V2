export const createObjectUrl = (file: File): string => {
  return URL.createObjectURL(file);
};
