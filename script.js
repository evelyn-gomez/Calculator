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

let params;
let result = null;
let currentDigits =[];

function reset() {
  params = {
    first: null,
    operator: null,
    last: null,
  }
}

reset();

function calc() {
  switch(params.operator) {
    case '+':
      return params.first + params.last;
    case '-':
      return params.first - params.last;
    case '/':
      throwErrorDivinding0();
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


function isParamsPropertyDefined(paramsProperty){
  if(paramsProperty == null || paramsProperty == undefined || isNaN(paramsProperty)){
    return false; 
  }
  return true; 
}

function number_test(result){
  let isdecimal = (result - Math.floor(result)) !== 0; 
    if(isdecimal){
    console.log('Number has isdecimal decimal place.');
    return result.toFixed(2); 
    } else {
    console.log('It is isdecimal whole number.'); 
    return result; 
    }
}

function onBtnExecution(buttonId){
  console.log(buttonId);
  let parsed = parseInt(buttonId);
  //5 main options - buttonId is isdecimal Num, Operator, Enter, Clear, or Backspace
  //if buttonIs isdecimal num
  if(!isNaN(parsed)){
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
        console.log(`${currentDigits} currentDigits is empty, operator is present, check params.first.`);
        //check if params.first is defined
        keyEnteredDisplay.textContent = `${currentDigits.join('')}`;
      if(isParamsPropertyDefined(params.first)){
        //if defined, changed operator only. 
        params.operator = buttonId; 
        totalDisplay.textContent = `${params.first} ${params.operator}`;
      }// else params.first not defined and currentDigits is empty 
      keyEnteredDisplay.textContent = `${currentDigits.join('')}`;
      return;
    }
    //currentDigits is not empty - check if params. first is defined. 
    if(isParamsPropertyDefined(params.first)){
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
      params.last = parseInt(strDigits);
      let calcResult = calc();
      result = number_test(calcResult);
      totalDisplay.textContent = `${params.first} ${params.operator} ${params.last} = ${result}`; 
      currentDigits = [];
      params.first = result; 
      params.last = null
      return; 
    }
    // currentDigits is not empty - params.first is not defined.
    let strDigits = currentDigits.join('');
    params.first = parseInt(strDigits);
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
    if(isParamsPropertyDefined(params.first) && Object.values(operatorValues).includes(params.operator)){
      //currentDigits is empty do not result(); 
      if(currentDigits.length === 0){
        totalDisplay.textContent = `${params.first} ${params.operator}`; 
        return;
      }
      console.log(`currentDigits = ${currentDigits},params.first = ${params.first}, params.operator = ${params.operator}`);
      let strDigits = currentDigits.join('');
      params.last = parseInt(strDigits);
      let calcResult = calc();
      result = number_test(calcResult); 
      totalDisplay.textContent = `${params.first} ${params.operator} ${params.last} = ${result}`; 
      reset(); 
      currentDigits = [result];
      return;  
    }
    //if both are not met return
    return;
  }
    
  //if buttonId is 'Clear'/'Delete'; 
  if(buttonId === 'Clear' || buttonId === 'Delete'){
    reset();
    currentDigits = [];
    result = null;
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

function enterDigits(parsed) {
  let digits = parsed.toString().split('');
  for (let digit of digits) {
    onBtnExecution(digit);
  }
}

function test(name, callback) {
  try {
    callback();
    console.log(`PASS - ${name}`);
  } catch(error) {
    console.log(`FAIL - ${name} (${error})`);
  } finally {
    reset();
    currentDigits =[];
  }
}

function assertCalculation({ first, operator, last, expected }) {
  enterDigits(first);
  onBtnExecution(operator);
  enterDigits(last);
  onBtnExecution('Enter');

  if (result !== expected) {
    let message = `${first} ${operator} ${last}`;
    throw Error(`${message} = ${result} (expected: ${expected})`);
  }
}

function runTests() {
  debugging = false;

  test('addition', () => {
    assertCalculation({
      first: 120,
      operator: '+',
      last: 5,
      expected: 125
    });
  });
  
  test('subtraction', () => {
    assertCalculation({
      first: 50,
      operator: '-',
      last: 3,
      expected: 47
    });
  });
  test('multiplication', ()=>{
    assertCalculation({
      first: 15,
      operator: '*',
      last: 40, 
      expected: 600,
    });
  });
  test('division', () =>{
    assertCalculation({
      first: 10, 
      operator: '/',
      last: 2,
      expected: 5,
    })
  })

  debugging = true;
}

runTests();

//obj that has properties { number/operator/string : someFunction(parsed/operator/string) }