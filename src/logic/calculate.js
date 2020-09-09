import Big from "big.js";
import operate from "./operate";
import isNumber from "./isNumber";

export default function calculate(obj, buttonName) {
  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null,
      lastPressed: null,
      sign: null
    };
  }

  if (isNumber(buttonName)) {
    if (buttonName === "0" && obj.next === "0") {
      return { lastPressed: buttonName };
    }
    if (obj.sign === "neg") {
      return { 
        next: `-${buttonName}`,
        lastPressed: buttonName 
      }
    }
    if (obj.operation) {
      if (obj.next) {
        return { 
          next: obj.next + buttonName,
          lastPressed: buttonName  
        };
      }
      return { 
        next: buttonName,
        lastPressed: buttonName  
      };
    }
    if (obj.next) {
      const next = obj.next === "0" ? buttonName : obj.next + buttonName;
      return {
        next,
        total: null,
        lastPressed: buttonName 
      };
    }
    return {
      next: buttonName,
      total: null,
      lastPressed: buttonName 
    };
  }

  if (buttonName === "%") {
    if (obj.operation && obj.next) {
      const result = operate(obj.total, obj.next, obj.operation);
      return {
        total: Big(result)
          .div(Big("100"))
          .toString(),
        next: null,
        operation: null,
        lastPressed: buttonName 
      };
    }
    if (obj.next) {
      return {
        next: Big(obj.next)
          .div(Big("100"))
          .toString(),
      };
    }
    return { lastPressed: buttonName };
  }

  if (buttonName === ".") {
    if (obj.next) {
      if (obj.next.includes(".")) {
        return { lastPressed: buttonName };
      }
      return { 
        next: obj.next + ".",
        lastPressed: buttonName 
      };
    }
    return { 
      next: "0.",
      lastPressed: buttonName 
    };
  }

  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
        lastPressed: buttonName
      };
    } else {
      return { lastPressed: buttonName };
    }
  }

  if (buttonName === "+/-") {
    if (obj.next) {
      return { 
        next: (-1 * parseFloat(obj.next)).toString(),
        lastPressed: buttonName 
      };
    }
    if (obj.total) {
      return { 
        total: (-1 * parseFloat(obj.total)).toString(),
        lastPressed: buttonName 
      };
    }
    return { lastPressed: buttonName };
  }

  if (buttonName === "+" || buttonName === "-" || buttonName === "x" || buttonName === "÷") {
    if (buttonName === "-" && (obj.lastPressed === "+" || obj.lastPressed === "-" || obj.lastPressed === "x" || obj.lastPressed === "÷" )) {
      return {
        total: obj.total,
        next: null,
        operation: obj.operation,
        sign: 'neg',
        lastPressed: buttonName
      }
    }
    if (buttonName !== "-" && (obj.lastPressed === "+" || obj.lastPressed === "-" || obj.lastPressed === "x" || obj.lastPressed === "÷" )) {
      return {
        total: obj.total,
        next: null,
        operation: buttonName,
        sign: null,
        lastPressed: buttonName
      }
    }
    if (!obj.next) {
      return { 
        operation: buttonName, 
        lastPressed: buttonName
      };
    }
    if (obj.operation) return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName,
      lastPressed: buttonName
    }
    else return {
      total: obj.next,
      next: null,
      operation: buttonName,
      lastPressed: buttonName
    };
  }
}