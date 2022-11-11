function add(a?: number, b?: number): number {
  if(a && b) {
    return a + b
  }

  return a || b || 0
}

function subtract(a?: number, b?: number): number {
  if(a && b) {
    return a - b
  }

  return a || b || 0
}

function multiply(a?: number, b?: number): number {
  if(a && b) {
    return a * b
  }

  return 0
}

function divide(a?: number, b?: number): number {
  if(a && b) {
    return a / b
  }

  return 0
}


const OPERATOR_FUNCTIONS: Record<string, (a?: number, b?:number) => number> = {
  ["+"]: add,
  ["-"]: subtract,
  ["*"]: multiply,
  ["/"]: divide
}

export function calculate(input: string, operands: number[]): number[] {
  const inputElements = input.split(" ").filter(e => e);

  inputElements.forEach(function(element) {
    const isNumber = !isNaN(element as any);
    const isOperator = !isNumber && Object.keys(OPERATOR_FUNCTIONS).includes(element);

    if(isNumber) {
      operands = [...operands, Number(element)]
    } else if(isOperator) {
      const operator = element;
      const operation = OPERATOR_FUNCTIONS[operator]
      const b = operands.pop() || 0;
      const a = operands.pop() || 0;
      const result = operation(a, b);
      operands = result ? [...operands, result] : operands;
    }
  })

  return operands.length ? operands : [0]
}