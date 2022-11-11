import {
  add,
  subtract,
  multiply,
  divide,
  calculate
} from '../operations.js'

describe("Arithmetic operations", () => {
  test("Addition", () => {
    let result = add(1,2);
    expect(result).toBe(3);

    result = add(0, 2);
    expect(result).toBe(2);

    result = add(2, 0);
    expect(result).toBe(2);
  });

  test("Subtraction", () => {
    let result = subtract(1,2);
    expect(result).toBe(-1);

    result = subtract(2,1);
    expect(result).toBe(1);

    result = subtract(0, 2);
    expect(result).toBe(-2);

    result = subtract(2, 0);
    expect(result).toBe(2);
  });

  test("Multiplication", () => {
    let result = multiply(1,2);
    expect(result).toBe(2);

    result = multiply(2,1);
    expect(result).toBe(2);

    result = multiply(0, 2);
    expect(result).toBe(0);

    result = multiply(2, 0);
    expect(result).toBe(0);
  });

  test("Division", () => {
    let result = divide(1,2);
    expect(result).toBe(0.5);

    result = divide(2,1);
    expect(result).toBe(2);

    result = divide(0, 2);
    expect(result).toBe(0);

    result = divide(2, 0);
    expect(result).toBe(0);
  });

  test("RPN Calculation - Input string", () => {
    let operands: number[] = [];
    let input = '5 5 5 8 + + -'
    operands = calculate(input, operands)
    let result = operands[operands.length - 1];
    expect(result).toBe(-13);

    input = '13 +'
    operands = calculate(input, operands)
    result = operands[operands.length - 1];
    expect(result).toBe(0);
  });

  test("RPN Calculation - Operand by operand", () => {
    let operands: number[] = [];
    let input = '5'
    operands = calculate(input, operands)
    let result = operands[operands.length - 1];
    expect(result).toBe(5);

    input = '9'
    operands = calculate(input, operands)
    result = operands[operands.length - 1];
    expect(result).toBe(9);

    input = '1'
    operands = calculate(input, operands)
    result = operands[operands.length - 1];
    expect(result).toBe(1);

    expect(operands).toEqual([5, 9, 1]);

    input = '-'
    operands = calculate(input, operands)
    result = operands[operands.length - 1];
    expect(result).toBe(8);

    input = '/'
    operands = calculate(input, operands)
    result = operands[operands.length - 1];
    expect(result).toBe(0.625);
  });
})

