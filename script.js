let btns = document.querySelector('div.btns'); 
let buttonValues = ['+/-','^','Back','Clear',7,8,9,'/',4,5,6,'*',1,2,3,'-',0,'.','%','+'];
let operatorValues = {
  addition: '+', 
  substraction: '-', 
  multiplication: '*', 
  division: '/', 
}

function removeLastVal(){
  //backspace -removes last value; 
}


// function someFun(key){
//   console.log(key)
// }

// function workingDisplay(){
//   //takes two num and and operator, and return a calculatio and saves it 
// }

// function firstNum () {
//   //save first num here? 
//   //then once opeartor intruced pass to workingDisplay(); 
//   //clear() function 

// }
// function secondNum(){
//   //save 2nd num here
// }
let currentDigits = [];

let params = {
  first: null,
  operator: null,
  last: null,
};

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

function onEnter() {
  console.log('enter');
  let strDigits = currentDigits.join('');
  params.last = parseInt(strDigits);
  let result = calc();
  console.log(result);
}

let getKeys = function (){
  for(let key of buttonValues) {
    let button = document.createElement('button');
    btns.appendChild(button);
    button.textContent = key;
    button.setAttribute('id',`${key}`);
    button.onclick = function() {
      
      // if typeof button is number, push into current number
      let parsed = parseInt(button.id); 
      if (!isNaN(parsed)) {
        currentDigits.push(parsed); 
        console.log(currentDigits);
        return;
      }

      // if is an operator, commit first number, commit operator, clear digits
      if (Object.values(operatorValues).includes(button.id)) {
        console.log('is operator');
        let strDigits = currentDigits.join('');
        params.first = parseInt(strDigits);
        params.operator = button.id;
        currentDigits = [];
        return;
      }


    }
  }
}
getKeys();






//obj that has properties { number/operator/string : someFunction(num/operator/string) }//
