import inquirer from 'inquirer';
import chalk from 'chalk';
import { calculate } from './utils/operations.js';

const log = console.log;
log(`
${chalk.bold.cyan('Welcome to the RPN CLI!')}

${chalk.cyan('Instructions:')}
- Use reverse polish notation to input your operands and operators,
  you can input an entire set like this, using a space as delimiter:

  ${chalk.yellow('5 5 5 8 + + -')}

  
- You can also input operand by operand, hitting enter in between. 
  The operands will be added to a stack for later use by an operator.
  Calculations will execute once you enter an operator.
- In both scenarios, an operator needs two preceeding operands, otherwise it will be disregarded.
- The allowed operators are:

  ${chalk.yellow('+ - / *')}

- An empty input will be interpreted as a ${chalk.bold.yellow('0')}.
- Type ${chalk.bold.yellow('c')} if you want to clear your stack.
- Type ${chalk.bold.yellow('q')} if you want to quit.

${chalk.bold.cyan('Have fun!')}
`);

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

let operands: number[] = [];

function ask() {
  inquirer.prompt(questions).then((answers: any) => {
    const input = answers.input;

    if(input === 'q') {
      console.log(chalk.bold.cyan('Good bye!'));
    } else if(input === 'c') { 
      operands = [];
      console.log(chalk.bold.cyan('Cleared!'))
      ask();
    } else {
      operands = calculate(input, operands)
      console.log(chalk.bold.yellow(operands[operands.length - 1]));
      ask();
    }
  });
}

ask();