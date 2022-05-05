let operatorChosen = false;

$(document).ready(function() {
  $('.clear').click(function() {
    $('.screen').text("");
    operatorChosen = false;
  })

  $('.operator').click(function() {
    let screen = $('.screen').text();
    if (screen.length > 0 && screen[screen.length - 1] != ' ' && !operatorChosen && screen[screen.length - 1] != "-") {
      $('.screen').text($('.screen').text() + " " + $(this).html() + " ");
      operatorChosen = true;
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
    if (screen.length > 0 && screen[screen.length - 1] != ' ') {
      $('.screen').text(compute(screen));
      operatorChosen = false;
    }
  })

  $('button:not(.clear, .equals, .operator, .negate)').click(function() {
    $('.screen').text($('.screen').text() + $(this).html());
  })
});

function compute(screen) {
  let screenArray = screen.split(" ");
  let operand1 = (screenArray[0] ==	"\u03C0") ? Math.PI : screenArray[0];
  let operand2 = (screenArray[2] ==	"\u03C0") ? Math.PI : screenArray[2];
  let answer = operand1;
  switch(screenArray[1]) {
    case "+":
      answer = operand1 + operand2;
      break;
    case "-":
      answer = operand1 - operand2;
      break;
    case "x":
      answer = operand1 * operand2;
      break;
    case "/":
      answer = operand1 / operand2;
      break;
  }

  return answer;
}