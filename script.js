let btns = document.querySelector('div.btns');
let buttonValues = ['+/-', '^', 'Back', 'Clear', 7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', 0, '.', '%', '+'];
let otherValidEventKeys = ['Backspace', '=', 'Enter'];

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
let enterParams; 
function resetEnterParams(){
  enterParams = {
    first: null,
    operator: null,
    last: null, 
  }
}
resetEnterParams(); 

function getsParamsLastToResult(){
  if(params.last == null){
    params.last = params.first;
    enterParams.first = params.first
    }else{
    params.last = enterParams.first; 
    }
    let calcResult = calc(); 
    result = calcResult; 
      if(typeof result == 'string'){
      console.log('its 0/0, sneaky msg');
      } 
      if(params.first == null && params.last == null){
      keyEnteredDisplay.textContent = currentDigits.join('');
      totalDisplay.textContent = ''; 
      return;
      }
    keyEnteredDisplay.textContent = currentDigits.join(''); 
    totalDisplay.textContent =`${params.first}${params.operator}${params.last} = ${result}`;
    params.first = result;
}

//create obj/varialbe to store previous 'buttonId' input -- to check and use
//create enterOnOperatorCalc() when last buttonId input was 'Operator'
//create function for enterOnEnterCalc() when last buttonId input was 'Enter'
let prevBtnId = null;   

function calc() {
  switch (params.operator) {
    case '+':
      return params.first + params.last;
    case '-':
      return params.first - params.last;
    case '/':
      if (params.first == 0 && params.last == 0) {
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

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

function number_test(result) {
  let isdecimal = (result - Math.floor(result)) !== 0;
  if (isdecimal) {
    console.log('Number has a decimal place.', isdecimal);
    return Number(result).toFixed(3);
  } else {
    console.log('It is a whole number.');
    return result;
  }
}
function pushNumber(parsed){
  if (currentDigits[0] == result) {
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

function emptyCurrentDigs(buttonId){
  console.log(`${currentDigits} currentDigits is empty, operator is present, need to check params.first.`);
  //check if params.first is defined
  if (isNumber(params.first)) {
  //if defined, changed operator only. 
  params.operator = buttonId;
  totalDisplay.textContent = `${params.first} ${params.operator}`;
  return;
  }// else params.first not defined and currentDigits is empty 
  keyEnteredDisplay.textContent = `${currentDigits.join('')}`;
  return;   
}
function notEmptyCurrentDigs(buttonId){
  if (isNumber(params.first)) {
    //if defined, if currentDigits is empty then changed operator only. 
    if (currentDigits.length == 0) {
      params.operator = buttonId;
      totalDisplay.textContent = `${params.first} ${params.operator}`;
      return;
    }
    // if currentdigits not empty -- need to add result()
    // currretDigits commit to params.last, result(), set currentDigits = [result]; 
    //return; 
    basicCalcNoResetting();
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
function basicCalcNoResetting(){
  let strDigits = currentDigits.join('');
  params.last = Number(strDigits);
  let calcResult = calc();
  if (typeof calcResult == 'string') {
    totalDisplay.textContent = `${calcResult}`;
    resetAll();
    keyEnteredDisplay.textContent = ``;
    return;
  }
  result = number_test(calcResult);
  totalDisplay.textContent = `${params.first} ${params.operator} ${params.last} = ${result}`;
  keyEnteredDisplay.textContent = ``;
  return;  
}

function resetPrevBtnId(){
  let prev = {
    btnId: null,
  }
}
resetPrevBtnId(); 


function calcIfTwoParams(buttonId){
  //currentDigits is empty do not result(); 
  if (currentDigits.length === 0) {
    totalDisplay.textContent = `${params.first} ${params.operator}`;
    return;
  }
  basicCalcNoResetting();
  currentDigits = [result];
  enterParams.first = params.last; 
  enterParams.operator = params.operator
  resetParams();
  return;
}

function convertToNeg(){
  let currentNum = Number(currentDigits.join(''));
  let negCurrentNum = Number(currentDigits.join('') * -1)
  console.log(typeof currentNum, currentNum);
  if (currentNum === negCurrentNum) {
    currentDigits = [parseInt(currentNum)];
    keyEnteredDisplay.textContent = currentDigits;
    return;

  }
  currentDigits = [parseInt(negCurrentNum)];
  keyEnteredDisplay.textContent = currentDigits;
  return;
}  



function calcIfNoCurrentDigits(){
  if(params.first == result){
    getsParamsLastToResult();
    keyEnteredDisplay.textContent = currentDigits.join(''); 
    return; 
  }
  params.first = enterParams.first; 
    if (enterParams.last == null){
      params.last = params.first; 
    }else{
      params.last = params.first/result;
    }
  params.operator = enterParams.operator;
  let calcResult = calc(); 
  result = calcResult; 
    if(typeof result == 'string'){
    console.log('its 0/0, sneaky msg');
    } 
    if(params.first == null && params.last == null){
    keyEnteredDisplay.textContent = currentDigits.join('');
    totalDisplay.textContent = ''; 
    return;
    }
  keyEnteredDisplay.textContent = currentDigits.join(''); 
  totalDisplay.textContent =`${params.first}${params.operator}${params.last} = ${result}`;
  params.first = result;
  return;
}
/**
 * Evalutes if buttonId is is a number, operator, enter/=, clear, backspace, or +/- (positive or negative number).
 * @param {string} buttonId 
 * @returns void
 */ 
function onKeyInput(buttonId) {
  console.log(buttonId);
  let parsed = parseInt(buttonId);
  let isANumber = !isNaN(parsed);
  let isOperator = Object.values(operatorValues).includes(buttonId);
  if(isANumber){
    pushNumber(parsed);
    return;
  }
  if(isOperator){
    // options 2 main ones: is currentDigits empty or not
    if (currentDigits.length === 0) {
      emptyCurrentDigs(buttonId);
      return;
    }
    notEmptyCurrentDigs(buttonId);
    prevBtnId = buttonId; 
    return;
  }
  switch (buttonId){ 
    case ('Enter' || '='):
          // if params.first && params.operator have been commited, then result()
      debug(currentDigits); 
      if (isNumber(params.first) && Object.values(operatorValues).includes(params.operator)) {
        calcIfTwoParams(buttonId);  
        if(currentDigits.length == 0){
          calcIfNoCurrentDigits();
          return; 
        }                    
        return;   
      }
      if(currentDigits.length == 0) {
        calcIfNoCurrentDigits();
        return;  
      }
      if(isNumber(enterParams.first)){
        console.log(currentDigits, params, enterParams);
        params.first = enterParams.first; 
        params.last = result;
        params.operator = enterParams.operator; 
        // cant do basicCalcNoResetting bc
        // its based on currentDigs NOT being empty
        let calcResult = calc();
        if (typeof calcResult == 'string') {
          totalDisplay.textContent = `${calcResult}`;
          resetAll();
          resetEnterParams(); 
          keyEnteredDisplay.textContent = ``;
          return;
        }
        result = number_test(calcResult);
        totalDisplay.textContent = `${params.first} ${params.operator} ${params.last} = ${result}`;
        keyEnteredDisplay.textContent = ``;
        currentDigits = [result]; 
        return;  
      } 
      return; 
    case ('Clear' || 'Delete'):
      resetAll();
      resetEnterParams();
      resetPrevBtnId(); 
      keyEnteredDisplay.textContent = `enter Val`;
      totalDisplay.textContent = `cleared`;
      return;
    case ('Back' || 'Backspace'  ):
      console.log(buttonId);
      console.log(currentDigits.pop());
      keyEnteredDisplay.textContent = `${currentDigits.join('')}`;
      return;
    case '+/-':
      convertToNeg(); 
      return; 
    case '^':
      alert('This function has been disabled!');  
      return;
    case '%':
      alert('This function has been disabled!'); 
      return;
    case '.':
      alert('This function has been disabled!');
    default: 
    return; 
  }
}

function createBtns() {
  document.addEventListener;
  document.addEventListener('keydown', (event) => {
    //convert type string to number -- reduces need to have to change array.ButtonValues numbers to strings.
    let parsedEventKey = parseInt(event.key);
    if (!isNaN(parsedEventKey)) {
      if (buttonValues.includes(parsedEventKey)) {
        onKeyInput(event.key);
        return;
      }
    }
    // if NaN then just check event.key 
    if (buttonValues.includes(event.key) || otherValidEventKeys.includes(event.key)) {
      onKeyInput(event.key);
      event.preventDefault();
      return;
    }
  });
}
createBtns();

for (let key of buttonValues) {
  let button = document.createElement('button');
  btns.appendChild(button);
  button.textContent = key;
  button.setAttribute('id', `${key}`);
  button.onclick = function (event) {
    onKeyInput(button.id);
  }
}

/**
 * Destructuring parsed, individual checking each digit
 * @const {boolean} isNeg negative digit needs to be evaluted last  
 * @param {number} parsed
 */
function enterDigits(parsed) {
  let digits = parsed.toString().split('')
  let isNeg;
  for (let digit of digits) {
    if (digit === '-') {
      isNeg = true;
    }
    onKeyInput(digit);
  }
  if (isNeg) {
    onKeyInput('+/-');
  }
}
/**
 * @param {string} name 
 * @param {function} callback 
 * 
 */
function test(name, callback) {
  try {
    callback();
    console.log(`PASS - ${name}`);
  } catch (error) {
    console.log(`FAIL - ${name} (${error})`);
  } finally {
    resetAll();
  }
}

/** 
 * Compares only display to expected display
 * @param {string} expected 
 * @param {string} message 
 */
function assertDisplay(expected, message) {
  assertThat(totalDisplay.textContent === expected, message);
}

/**
 * Helper function for @function assertDisplay Checks if condition is truthy, if truthy then does NOT throw error. 
 * @param {string} condition 
 * @param {string} message 
 */
function assertThat(condition, message) {
  if (!condition) {
    throw Error(message);
  }
}

/**
 * Compares only display result with expected 
 * @param {string} expected 
 * @param {string} message 
 * 
 */
 function assertResult(expected, message) {
  let [formula, result] = totalDisplay.textContent.split(' = ');
  assertThat(result == expected, message);
}

/**
 * Evaluates that all the display is equal to expected display 
 * and returns message when failed.
 * @param {{first: number, operator: string, last: number, expected: number}} 
 * 
 * @const {string} display
 */
function testBasicCalc({ first, operator, last, expected }) {
  enterDigits(first);
  onKeyInput(operator);
  enterDigits(last);
  onKeyInput('Enter');

  let display = `${first} ${operator} ${last} = ${result}`;
  assertDisplay(display, `${display} (expected: ${expected})`);
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
  test('multiplication', () => {
    testBasicCalc({
      first: 15,
      operator: '*',
      last: 40,
      expected: 600,
    });
  });
  test('division', () => {
    testBasicCalc({
      first: 10,
      operator: '/',
      last: 2,
      expected: 5,
    })
  })

  test('operator is ignored before other input', () => {
    function assertAllNull(message) {
      let allNull = Object.values(params).concat(result).every(val => val === null);
      allNull &= !currentDigits.length;
      assertThat(allNull, message);
    }

    onKeyInput('+');
    assertAllNull('after operator all null');
  });

  test('calc with operator and then continue with enter', () => {
    let firstDigit = 10;
    let secondDigit = 20;
    enterDigits(firstDigit);
    onKeyInput('+');
    enterDigits(secondDigit);

    let firstResult = firstDigit + secondDigit;

    onKeyInput('+');
    assertResult(firstResult, 'correct after calc with operator');

    console.log(currentDigits,params);
    onKeyInput('Enter');
    assertResult(firstResult * 2, 'correct after enter');
    onKeyInput('Enter');
    assertResult(firstResult * 3, 'correct after second enter');

    onKeyInput('Enter');
    assertResult(firstResult * 4, 'correct after thrid enter');

    onKeyInput('Enter');
    assertResult(firstResult * 5, 'correct after 4th enter');
    console.log(params,currentDigits, enterParams);
  });

  test('calc with enter and then continue with enter', () => {
    let firstDigit = 5;
    let secondDigit = 2;
    enterDigits(firstDigit);
    onKeyInput('+')
    enterDigits(secondDigit);

    let firstResult = firstDigit + secondDigit;

    onKeyInput('Enter');
    assertResult(firstResult, 'correct after calc with operator');

    onKeyInput('Enter');
    assertResult(firstResult + secondDigit * 2 , 'correct after enter');
  });
  totalDisplay.textContent = ''; 

  debugging = true;
}

runTests();
resetAll();
resetEnterParams();
resetPrevBtnId(); 
