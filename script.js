let numberKeys = document.querySelector('div.keys'); 

// create 5 rows, each row has 4 buttons = 20 btn total

function createKeys(){
  let row =[];
  for(let i = 0; i < 5; i++){
    const row = document.createElement('div'); 
    row.classList.add = 'row';
    for(let j = 0; j < 4; j++){
        const button = document.createElement('button');
        row.classList.add = 'keyButtons';
        row.appendChild(button);
    } 
    numberKeys.appendChild(row);
  }
}
createKeys();

//obj that has properties { number: numberOrString, thisFun: someFun thatexcuctesforBtn}
//
