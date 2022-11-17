import { useEffect, useRef, useState } from "react";
import { IntlShape, useIntl } from "react-intl";

type Validator = (value: any, intl: IntlShape) => string | void;

export function useValidation<VT extends Record<string, any>>(
  validators: {
    [K in keyof VT]: Validator[];
  },
  value: VT
) {
  const intl = useIntl();
  const editedValues = useRef<string[]>([]);
  const lastValue = useRef<VT>({} as VT);

  for (let item in lastValue.current) {
    if (
      !editedValues.current.includes(item) &&
      lastValue.current[item] !== value[item]
    ) {
      editedValues.current.push(item);
    }
  }

  let isValid = true;
  const errors = {} as { [K in keyof VT]: string[] };

  for (let item in value) {
    const itemErrors: string[] = [];

    for (let validator of validators[item]) {
      const result = validator(value[item], intl);
      if (result) {
        if (editedValues.current.includes(item)) {
          itemErrors.push(result);
        }
        isValid = false;
      }
    }

    errors[item] = itemErrors;
  }

  lastValue.current = value;
  return { isValid, errors };
}

export function validateLength(options: {
  length?: number;
  min?: number;
  max?: number;
}): Validator {
  return (value: string, intl) => {
    if (options.length !== undefined && value.length !== options.length)
      return `باید ${intl.formatNumber(options.length)} کاراکتر داشته باشد`;
    if (options.min !== undefined && value.length < options.min)
      return `باید حداقل ${intl.formatNumber(options.min)} کاراکتر داشته باشد`;
    if (options.max !== undefined && value.length > options.max)
      return `باید حداکثر ${intl.formatNumber(options.max)} کاراکتر داشته باشد`;
  };
}

export function optionalValidate(options: {
  enabled: boolean;
  validator: Validator;
}): Validator {
  return (value, intl) => {
    if (options.enabled) return options.validator(value, intl);
  };
}

export function validateInt(options?: {
  length?: number;
  unsigned?: boolean;
  min?: number;
  max?: number;
}): Validator {
  return (value: string, intl) => {
    if (
      isNaN(parseInt(value)) ||
      (options?.unsigned && !(parseInt(value) >= 0))
    )
      return "باید عدد باشد";
    if (
      options?.length !== undefined &&
      parseInt(value).toString().length !== options?.length // Remove '+' or '--' Character
    )
      return `باید ${intl.formatNumber(options.length)} رقم داشته باشد`;
    if (options?.min !== undefined && parseInt(value) < options.min)
      return `باید حداقل ${intl.formatNumber(options.min)} باشد`;
    if (options?.max !== undefined && parseInt(value) > options.max)
      return `باید حداکثر ${intl.formatNumber(options.max)} باشد`;
  };
}

export function validatePhoneNumber(): Validator {
  return (value: string, intl) => {
    if (
      validateLength({ length: 11 })(value, intl) ||
      validateInt({ length: 10, unsigned: true })(value, intl) || // the 0 in start will be remove in int
      !value.startsWith("09")
    )
      return "شماره موبایل نامعتبر است";
  };
}

export function validateNotEmpty(options?: { message?: string }): Validator {
  return (value: any) => {
    if (Array.isArray(value) ? !value.length : !value)
      return options?.message || "نباید خالی باشد";
  };
}

export function validatePasswordRepeat(password: string): Validator {
  return (value: string) => {
    if (value !== password) return "رمزهای عبور باید مطابقت داشته باشند";
  };
}
