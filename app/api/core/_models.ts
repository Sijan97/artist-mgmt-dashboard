export type OnSuccessFunction = (data: any, additionalData?: any) => void;
export type OnErrorFunction = (data: any) => void;

export const CONTENT_TYPES = {
  JSON: "application/json",
  FORM_DATA: "multipart/form-data",
};
