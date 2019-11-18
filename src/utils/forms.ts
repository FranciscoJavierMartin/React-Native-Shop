import { IInputState } from "../interfaces/state";
import { IInputAction } from "../interfaces/actions";

export const FORM_INPUT_UPDATE = 'UPDATE';

export const formReducer = (state: IInputState, action: IInputAction): IInputState => {
  let newState: IInputState;

  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };

      const updatedFormIsValid = Object.keys(updatedValidities).some(
        (key: string) => updatedValidities[key]
      );

      newState = {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
      break;
    default:
      newState = state;
  }

  return newState;
};