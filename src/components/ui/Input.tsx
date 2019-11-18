import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { TextInputProps } from "react-native" // added this line

interface IInputProps extends TextInputProps{
  label: string;
  errorText: string;
  initialValue?: string;
  initiallyValid?: boolean;
  id: string;
  onInputChange: (id: string, value: string, isValid: boolean) => void;
  isEmail?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
}

interface IInputState {
  touched: boolean;
  value: string;
  isValid: boolean;
}

interface IInputAction {
  type: string;
  value?: string;
  isValid?: boolean;
}

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (
  state: IInputState,
  action: IInputAction
): IInputState => {
  let newState: IInputState;

  switch (action.type) {
    case INPUT_BLUR:
      newState = {
        ...state,
        touched: true
      };
      break;
    case INPUT_CHANGE:
      newState = {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
      break;
    default:
      newState = state;
  }

  return newState;
};
const Input = (props: IInputProps) => {
  const [inputState, dispatch] = useReducer<
    (state: IInputState, action: IInputAction) => IInputState
  >(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text: string) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.isEmail && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%"
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: "open-sans",
    color: "red",
    fontSize: 13
  }
});

export default Input;
