export type FormFieldModel = {
  input_type: string;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  value?: string | number | Array<any> | boolean;
  options?: Array<SelectOptionModel>;

  // additional attributes
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;

  max?: number;
  maxSize?: number;
  columnSize?: number;
  rows?: number;
};

export type SelectOptionModel = {
  value: string;
  label: string;
  description?: string;
};
