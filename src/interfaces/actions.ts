// TODO: Create custom action interfaces for each kind of action
export interface IAction {
  type: string;
  payload: any;
}

export interface IInputAction {
  type: string;
  isValid: boolean;
  value: string;
  input: string;
}