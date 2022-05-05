let error = false;
const precedence = {
  "x": 2,
  "/": 2,
  "+": 1,
  "-": 1
}

$(document).ready(function() {
  $('.clear').click(function() {
    $('.screen').text("");
    error = false;
  })

  $('.operator').click(function() {
    let screen = $('.screen').text();
    if (screen.length > 0 && screen[screen.length - 1] != ' ' && screen[screen.length - 1] != "-") {
      $('.screen').text($('.screen').text() + " " + $(this).html() + " ");
    }
  })

  $('.negate').click(function() {
    let screen = $('.screen').text();
    if (screen[screen.length - 1] == " " || screen.length == 0) {
      $('.screen').text($('.screen').text() + "-");
    }
  })

  $('.equals').click(function() {
    let screen = $('.screen').text();
    if (screen.length > 0) {
      if (screen[screen.length - 1] == ' ' || screen[screen.length - 1] == '-') {
        $('.screen').text("ERROR!");
        error = true;
      } else {
        $('.screen').text(compute(screen));
      }
    }
  })

  $('button:not(.clear, .equals, .operator, .negate)').click(function() {
    let screen = $('.screen').text();
    if (!error && screen.length < 25) {
      if ($(this).html() !== "\u03C0" || screen.length == 0 || screen[screen.length - 1] == " ") {
        $('.screen').text($('.screen').text() + $(this).html());
      }
    }
  })
});

function isOperator(x) {
  switch (x) {
    case "x":
    case "/":
    case "+":
    case "-":
      return true;
    default:
      return false;
  }
}

function expressionToPostfix(expression) {
  let infix = expression.split(" ");
  console.log(infix);
  let postfix = [];
  let operators = [];
  for (const i of infix) {
    if (isOperator(i)) {
      let done = false;
      while(!done) {
        if (operators[operators.length - 1] == null || precedence[i] > precedence[operators[operators.length - 1]]) {
          operators.push(i);
          done = true;
        } else if (precedence[i] == precedence[operators[operators.length - 1]]) {
          postfix.push(operators.pop());
          operators.push(i);
          done = true;
        } else {
          postfix.push(operators.pop());
        }
      }
    } else {
      postfix.push(i);
    }
  }
  let operatorsLength = operators.length;
  for (let i = 0; i < operatorsLength; i++) {
    postfix.push(operators.pop());
  }
  return postfix;
}

function compute(expression) {
  let postfix = expressionToPostfix(expression);
  let result = [];
  while (postfix.length > 0) {
    let current = postfix.shift();
    if (isOperator(current)) {
      let operand1 = result.shift();
      let operand2 = result.shift();
      operand1 = (operand1 ==	"\u03C0") ? Math.PI : operand1;
      operand2 = (operand2 ==	"\u03C0") ? Math.PI : operand2;
      console.log(result);
      switch (current) {
        case "+":
          result.unshift(operand1 + operand2);
          break;
        case "-":
          result.unshift(operand1 - operand2);
          break;
        case "x":
          result.unshift(operand1 * operand2);
          break;
        case "/":
          result.unshift(operand1 / operand2);
          break;
      }
    } else {
      result.unshift(current);
    }
  }
  return result[0];
}