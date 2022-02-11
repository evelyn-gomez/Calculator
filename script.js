let btns = document.querySelector('div.btns'); 
let buttonValues = ['+/-','^','Back','Clear',7,8,9,'/',4,5,6,'*',1,2,3,'-',0,'.','%','+'];

let otherValidEventKeys = ['Backspace','=','Enter'];

let keyEnteredDisplay = document.querySelector('div#keysEntered'); 
let totalDisplay = document.querySelector('#total'); 

let operatorValues = {
  addition: '+', 
  substraction: '-', 
  multiplication: '*', 
  division: '/', 
}

let params, result, currentDigits;

function resetParams() {
  params = {
    first: null,
    operator: null,
    last: null,
  }
}

function resetAll() {
  resetParams();
  result = null;
  currentDigits = [];
}

resetAll();

function calc() {
  switch(params.operator) {
    case '+':
      return params.first + params.last;
    case '-':
      return params.first - params.last;
    case '/':
      if(params.first == 0 && params.last == 0){
        return 'Sneaky! But you cannot divide 0 / 0'; 
      }
      return params.first / params.last;
    case '*':
      return params.first * params.last;
  }
}

let debugging = true;
function debug(message) {
  if (!debugging) {
    return;
  }
  console.log(message);
}

function isNumber(value){
  return typeof value === 'number' && !isNaN(value);
}

function number_test(result){
  let isdecimal = (result - Math.floor(result)) !== 0; 
    if(isdecimal){
    console.log('Number has a decimal place.',isdecimal);
    return Number(result).toFixed(3); 
    } else {
    console.log('It is a whole number.'); 
    return result; 
    }
}

/**
 * iwepaoiwefjpoawiefj
 * @param {string} buttonId 
 * @returns void
 */
function onBtnExecution(buttonId){
  console.log(buttonId);
  let parsed = parseInt(buttonId);
  //5 main options - buttonId is isdecimal Num, Operator, Enter, Clear, or Backspace
  //if buttonIs isdecimal num
  if(!isNaN(parsed)){
    if(currentDigits[0] == result){
      currentDigits = [];
      currentDigits.push(parsed);
      keyEnteredDisplay.textContent = currentDigits.join('');
      return;
    }
    debug(currentDigits);
    currentDigits.push(parsed);
    keyEnteredDisplay.textContent = currentDigits.join(''); 
    return;       
  }
  //buttonId is operatorVal
  if(Object.values(operatorValues).includes(buttonId)){
    // options 2 main ones: is currentDigits empty or not
    console.log(params.first);
    //check to see if you should commit buttonId to operator;  
    if(currentDigits.length === 0){
        console.log(`${currentDigits} currentDigits is empty, operator is present, need to check params.first.`);
        //check if params.first is defined
      if(isNumber(params.first)){
        //if defined, changed operator only. 
        params.operator = buttonId; 
        totalDisplay.textContent = `${params.first} ${params.operator}`;
      }// else params.first not defined and currentDigits is empty 
      keyEnteredDisplay.textContent = `${currentDigits.join('')}`;
      return;
    }
    //currentDigits is not empty - check if params. first is defined. 
    if(isNumber(params.first)){
      //if defined, if currentDigits is empty then changed operator only. 
      if(currentDigits.length == 0){
        params.operator = buttonId; 
        totalDisplay.textContent = `${params.first} ${params.operator}`;
        return;  
      }
      // if currentdigits not empty -- need to add result()
      // currretDigits commit to params.last, result(), set currentDigits = [result]; 
      //return; 
      let strDigits = currentDigits.join('');
      params.last = Number(strDigits); 
      let calcResult = calc();
      if (typeof calcResult == 'string'){
        totalDisplay.textContent =`${calcResult}`;
        resetAll();
        keyEnteredDisplay.textContent = ``;
        return;
      }
      result = number_test(calcResult);
      totalDisplay.textContent = `${params.first} ${params.operator} ${params.last} = ${result}`; 
      currentDigits = [];
      params.first = result; 
      params.last = null
      params.operator = buttonId; 
      return; 
    }
    // currentDigits is not empty - params.first is not defined.
    let strDigits = currentDigits.join('');
    params.first = Number(strDigits);
    params.operator = buttonId;
    currentDigits = [];
    totalDisplay.textContent = `${params.first} ${params.operator}`; 
    return; 
  }
  //if  buttonid is 'Enter'/'='
  if(buttonId === 'Enter' || buttonId === '='){
    // if params.first && params.operator have been commited, then result()
    debug(currentDigits);
    console.log(currentDigits, params);
    if(isNumber(params.first) && Object.values(operatorValues).includes(params.operator)){
      //currentDigits is empty do not result(); 
      if(currentDigits.length === 0){
        totalDisplay.textContent = `${params.first} ${params.operator}`; 
        return;
      }
      console.log(`currentDigits = ${currentDigits},params.first = ${params.first}, params.operator = ${params.operator}`);
      let strDigits = currentDigits.join('');
      params.last = Number(strDigits);
      let calcResult = calc();
      if (typeof calcResult === 'string'){
        totalDisplay.textContent =`${calcResult}`;
        keyEnteredDisplay.textContent = ``;
        resetAll();
        return;
      }
      result = number_test(calcResult); 
      totalDisplay.textContent = `${params.first} ${params.operator} ${params.last} = ${result}`; 
      keyEnteredDisplay.textContent = ``;
      resetParams(); 
      currentDigits = [result];
      return;  
    }
    //if both are not met return
    return;
  }
    
  //if buttonId is 'Clear'/'Delete'; 
  if(buttonId === 'Clear' || buttonId === 'Delete'){
    resetAll();
    keyEnteredDisplay.textContent = `enter Val`; 
    totalDisplay.textContent =`cleared`;
    return; 
  }
  //if buttonId is 'Backspace' || 'Back'
  if(buttonId === 'Backspace' || buttonId === 'Back'){
    currentDigits.pop(); 
    keyEnteredDisplay.textContent =`${currentDigits.join('')}`;
    return
  }
  if(buttonId === '+/-'){
    let currentNum = Number(currentDigits.join('')); 
    let negCurrentNum = Number(currentDigits.join('') * -1)
    console.log(typeof currentNum, currentNum);
    if(currentNum === negCurrentNum){
      currentDigits = [parseInt(currentNum)];
      keyEnteredDisplay.textContent = currentDigits;
      return;
      
    }
    currentDigits = [parseInt(negCurrentNum)];
    keyEnteredDisplay.textContent = currentDigits; 
    return;
  }
}

let createBtns = function (){
  document.addEventListener
  document.addEventListener('keydown', (event) =>{ 
    //convert type string to number -- reduces need to have to change array.ButtonValues numbers to strings.
    let parsedEventKey = parseInt(event.key);
    if(!isNaN(parsedEventKey)){
      if(buttonValues.includes(parsedEventKey)){
        onBtnExecution(event.key);
        return;
      }    
    }
    // if NaN then just check event.key 
    if(buttonValues.includes(event.key) || otherValidEventKeys.includes(event.key)){
      onBtnExecution(event.key);
      event.preventDefault(); 
      return; 
    }    
  })
}
createBtns();

for(let key of buttonValues) {
  let button = document.createElement('button');
  btns.appendChild(button);
  button.textContent = key;
  button.setAttribute('id',`${key}`);
  button.onclick = function(event){
    onBtnExecution(button.id);
  }
}

/**
 * 
 * @param {number} parsed 
 */
function enterDigits(parsed) {
  let digits = parsed.toString().split('')
  let isNeg;
  for (let digit of digits) {
    if (digit === '-') {
      isNeg = true;
    }
    onBtnExecution(digit);
  }
  if (isNeg) {
    onBtnExecution('+/-');
  }
}

function test(name, callback) {
  try {
    callback();
    console.log(`PASS - ${name}`);
  } catch(error) {
    console.log(`FAIL - ${name} (${error})`);
  } finally {
    resetAll();
  }
}

function testBasicCalc({ first, operator, last, expected }) {
  enterDigits(first);
  onBtnExecution(operator);
  enterDigits(last);
  onBtnExecution('Enter');

  let display = `${first} ${operator} ${last} = ${result}`;
  assertDisplay(display, `${display} (expected: ${expected})`);
}

function assertDisplay(expected, message) {
  assertThat(totalDisplay.textContent === expected, message);
}

function assertResult(expected, message) {
  let [formula, result] = totalDisplay.textContent.split(' = ');
  assertThat(result == expected, message);
}

function assertThat(condition, message) {
  if (!condition) {
    throw Error(message);
  }
}

function assertNull(value, message) {
  assertThat(value === null, message);
}

function runTests() {
  debugging = false;

  test('addition', () => {
    testBasicCalc({
      first: 120,
      operator: '+',
      last: 5,
      expected: 125,
    });
  });

  test('addition with negatives', () => {
    testBasicCalc({
      first: -120,
      operator: '+',
      last: 5,
      expected: -115,
    });
  });
  
  test('subtraction', () => {
    testBasicCalc({
      first: 50,
      operator: '-',
      last: 3,
      expected: 47
    });
  });
  test('multiplication', ()=>{
    testBasicCalc({
      first: 15,
      operator: '*',
      last: 40, 
      expected: 600,
    });
  });
  test('division', () =>{
    testBasicCalc({
      first: 10, 
      operator: '/',
      last: 2,
      expected: 5,
    })
  })

  test('operator is ignored before other input', () =>{
    function assertAllNull(message) {
      let allNull = Object.values(params).concat(result).every(val => val === null);
      allNull &= !currentDigits.length;
      assertThat(allNull, message);
    }
  
    onBtnExecution('+');
    assertAllNull('after operator all null');
  });
  
  test('calc with operator and then continue with enter', () => {
    let firstDigit = 5;
    let secondDigit = 3;
    enterDigits(firstDigit);
    onBtnExecution('+')
    enterDigits(secondDigit);
  
    let firstResult = firstDigit + secondDigit;
  
    onBtnExecution('+');
    assertResult(firstResult, 'correct after calc with operator');
  
    onBtnExecution('Enter');
    assertResult(firstResult * 2, 'correct after enter');
  });

  test('calc with enter and then continue with enter', () => {
    let firstDigit = 5;
    let secondDigit = 3;
    enterDigits(firstDigit);
    onBtnExecution('+')
    enterDigits(secondDigit);
  
    let firstResult = firstDigit + secondDigit;
  
    onBtnExecution('Enter');
    assertResult(firstResult, 'correct after calc with operator');
  
    onBtnExecution('Enter');
    assertResult(firstResult + secondDigit * 2, 'correct after enter');
  });

  debugging = true;
}

runTests();