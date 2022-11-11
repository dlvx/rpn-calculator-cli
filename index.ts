import inquirer from 'inquirer';
import { calculate } from './utils/operations.js';

console.log("Hello!")

const questions = [
  {
    type: 'input',
    name: 'input',
    message: "",
    prefix: ">",
    validate(value: string) {
      const pass = value.match(
        /^[0-9qc+\-*\/\s]*$/
      ) 

      if (pass) {
        return true;
      } 

      return "Only numeric values and the operators: + - * / are allowed. Enter 'c' to clear the stored values and 'q' to exit.";
    },
  },
]

const output: string[] = [];
let operands: number[] = [];

function ask() {
  inquirer.prompt(questions).then((answers: any) => {
    const input = answers.input;
    output.push(input);

    if(input === 'q') {
      console.log('Good bye!');
    } else if(input === 'c') { 
      operands = [];
      console.log('Cleared!')
      ask();
    } else {
      operands = calculate(input, operands)
      console.log(operands[operands.length - 1]);
      ask();
    }
  });
}

ask();