let btns = document.querySelector('div.btns'); 
let buttonValues = ['+/-','^','Back','Clear',7,8,9,'/',4,5,6,'*',1,2,3,'-',0,'.','%','+'];

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

function onBtnExecution(buttonId){
   // if typeof button is number, push into current number
   debug(buttonId);
   let parsed = parseInt(buttonId);        
   if (!isNaN(parsed)) {
     currentDigits.push(parsed); 
     debug(currentDigits);
     keyEnteredDisplay.textContent = currentDigits.join(''); 
     return;
   }

   // if is an operator, commit first number, commit operator, clear digits
   if (Object.values(operatorValues).includes(buttonId)) {
     debug('is operator');
     let strDigits = currentDigits.join('');
     console.log(strDigits);
     params.first = parseInt(strDigits);
     params.operator = buttonId;
     currentDigits = [];
     return;
   }

   if(buttonId === 'Enter'){
    debug('enter');
    let strDigits = currentDigits.join('');
    params.last = parseInt(strDigits);
    result = calc();   
    totalDisplay.textContent = `${params.first} ${params.operator} ${params.last} = ${result}`; 
    currentDigits = [result];
    console.log(currentDigits); 
    debug(params.result); 
   }

   if (buttonId === 'Clear'){
     reset(); 
     currentDigits = []; 
   }
   if(buttonId === 'Back'){
    if(params.operator !== null){
      params.operator = null; 
    }
    currentDigits.pop();
   }
   keyEnteredDisplay.textContent = currentDigits; 
}


let createBtns = function (){
  document.addEventListener
  document.addEventListener('keydown', (event) =>{  
    onBtnExecution(event.key); 
  })

  for(let key of buttonValues) {
    let button = document.createElement('button');
    btns.appendChild(button);
    button.textContent = key;
    button.setAttribute('id',`${key}`);
    button.onclick = function(event) {
      onBtnExecution(button.id);
    }
  }
}
createBtns();

// function enterDigits(num) {
//   let digits = num.toString().split('');
//   for (let digit of digits) {
//     onBtnExecution(digit);
//   }
// }

// function test(name, callback) {
//   try {
//     callback();
//     console.log(`PASS - ${name}`);
//   } catch(error) {
//     console.log(`FAIL - ${name} (${error})`);
//   } finally {
//     reset();
//   }
// }

// function assertCalculation({ first, operator, last, expected }) {
//   enterDigits(first);
//   onBtnExecution(operator);
//   enterDigits(last);
//   onBtnExecution('Enter');

//   if (result !== expected) {
//     let message = `${first} ${operator} ${last}`;
//     throw Error(`${message} = ${result} (expected: ${expected})`);
//   }
// }

// function runTests() {
//   debugging = false;

//   test('addition', () => {
//     assertCalculation({
//       first: 120,
//       operator: '+',
//       last: 5,
//       expected: 125
//     });
//   });
  
//   test('subtraction', () => {
//     assertCalculation({
//       first: 50,
//       operator: '-',
//       last: 3,
//       expected: 47
//     });
//   });

//   debugging = true;
// }

// runTests();

//obj that has properties { number/operator/string : someFunction(num/operator/string) }//
