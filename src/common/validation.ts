export type FieldValidator = (value: unknown) => string

export function requiredValidator(msg?: string): FieldValidator {
  return (value: unknown) => {
    msg = msg || "Required";

    if (typeof value === "number" && !isNaN(value)) {
      return ""  
    }
    if (value) {
      return "";
    }
    return msg;
  }
}

export function phoneNumberValidator(msg?: string): FieldValidator {
  const regex = new RegExp(/^\+?[\d-() ]{10,18}$/);
  return regexValidator(regex, msg || "Invalid phone number")
}

export function emailValidator(msg?: string): FieldValidator {
  const regex = new RegExp(/^[\w+-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  return regexValidator(regex, msg || "Invalid email address")
}

export function regexValidator(regex: RegExp, msg: string): FieldValidator {
  return (value: unknown) => {
    if (value === null || value === "") {
      return "";
    }
    if ((value as string).match(regex)) {
      return "";
    }

    return msg;
  }
}

interface DateValidatorOptions {
  invalidMsg?: string;
  startMsg?: string;
  endMsg?: string;
  start?: Date;
  end?: Date;
}
export function dateValidator({invalidMsg, startMsg, endMsg, start, end}: DateValidatorOptions): FieldValidator {
  return (date: unknown) => {
    let _date: Date = new Date(0);

    if (typeof date === "string") {
      _date = new Date(date);
    }
    if ((date as Date).toDateString) {
      _date = date as Date;
    }

    if (_date.toString() === "Invalid Date" || _date.getTime() === 0) {
      return invalidMsg || "Invalid date";
    }

    if (_date && start && _date < start) {
      return startMsg || `Must be after ${start}`
    }
    if (_date && end && _date > end) {
      return endMsg || `Must be before ${end}`
    }

    return ""
  }
}

interface NumericValidatorOptions {
  invalidTypeMsg?: string;
  minMsg?: string;
  maxMsg?: string;
  min?: number;
  max?: number;
}
export function numericValidator({invalidTypeMsg, minMsg, maxMsg, min = -Number.MAX_VALUE, max = Number.MAX_VALUE}: NumericValidatorOptions): FieldValidator {
  return (value: unknown) => {
    let _value: number = Number.MAX_VALUE;

    if (typeof value === "string") {
      _value = parseFloat(value);
    }
    if (typeof value === "number") {
      _value = value;
    }

    if (isNaN(_value)) {
      return invalidTypeMsg || "Must be a numeric value";
    }

    if (_value > max) {
      return maxMsg || `Must be less than ${max}`;
    }
    if (_value < min) {
      return minMsg || `Must be greater than ${min}`;
    }

    return ""
  }
}

interface LengthValidatorOptions {
  invalidTypeMsg?: string;
  minMsg?: string;
  maxMsg?: string;
  max?: number;
  min?: number;
}
export function lengthValidator({invalidTypeMsg, minMsg, maxMsg, min = -Number.MAX_VALUE, max = Number.MAX_VALUE}: LengthValidatorOptions): FieldValidator {
  return (value: unknown) => { 
    if (typeof value !== "string") {
      return invalidTypeMsg || "Invalid type";
    }

    if (value.length > max) {
      return maxMsg || `Must be less than ${max} characters`;
    }

    if (value.length < min) {
      return minMsg || `Must be greater than ${min} characters`;
    }

    return ""
  }
}


export class Validator {
  private validators: FieldValidator[];

  constructor(...validators: FieldValidator[]) {
    this.validators = validators;
  }
  
  validate(val: unknown): string {
    for (const validate of this.validators) {
      const msg = validate(val)
      if (msg) {
        return msg;
      }
    }
    return "";
  }
}
