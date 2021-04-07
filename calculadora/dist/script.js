function checkInputToFloat(n){
  // this checks if a number can be parsed to float
  // if not, throws an error
  parsedNumber = parseFloat(n);
  if (isNaN(parsedNumber)){
    throw new FatalError("Input failed to parse.")
  }
  return parsedNumber;
}

function checkOperation(op){
  // this checks if an operation is valid
  // if not, throws an error
  if (["+", "-", "*", "/"].indexOf(op) < 0){
    throw new FatalError("Operation not correct.")
  }
  return op;
}
try{
  // the main try block will execute the functions
  var firstInput = prompt("Enter the first number:");
  var firstNumber = checkInputToFloat(firstInput);
  var op = checkOperation(prompt("Enter the operation:"));
  var secondInput = prompt("Enter the second number:");
  var secondNumber = checkInputToFloat(secondInput);
  try{
      // this try block is because js thought try/catch blocks
      // without else was a good idea (???)
      var op_dict = {
      "+" : (a, b) => a + b,
      "-" : (a, b) => a - b,
      "*" : (a, b) => a * b,
      "/" : (a, b) => a / b,
      };
      // nothing like dictionaries and first class functions am I right?
      var res = op_dict[op](firstNumber, secondNumber);
      document.write("<h2>" + firstNumber + op + secondNumber + "=" + res.toFixed(2) + "</h2>");
  }
  // this is the "else" try block error-handler, but
  // since op is being checked, only .write could fail
  // and I honestly think we have problems when that happens
  catch(err){}
}
catch(err){
  // this is the "error handling" part
  document.write("<h2>ERROR</h2>");
}