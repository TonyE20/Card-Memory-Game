const gameContainer = document.getElementById("game");
const start = document.querySelector('.start');
const reset = document.querySelector('.reset');
const guessed = document.querySelector('#guess');
const bestScore = document.querySelector('#score');
let cardsClass = [];
let cardsNumber = 0;
let cardsTotal = 10;
let guess = 0;
let topScore = 0;
const COLORS = [
  "red", 
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let random = Math.floor(Math.random() * array.length);
  let counter = random;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {

    for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick)
    gameContainer.append(newDiv);
    reset.addEventListener('click',function(e){
        if(e.target.className == 'reset'){
            cardsClass = []
            guess = 0;   
            newDiv.style.backgroundColor = 'white';
            guessed.innerText = '';
            cardsTotal = 10;
         }   
        });
  }
}

bestScore.innerText = parseInt(localStorage.getItem('topScore'));

function handleCardClick(event) {
 if( cardsClass.length < 2){

    event.target.style.backgroundColor = event.target.className;
   
    if(cardsClass.length === 0 ){
    cardsClass.push(event.target.className);
    }
    else if(cardsClass.length === 1){
      cardsClass.push(event.target.className);
      guess ++
      guessed.innerText = `Guessed = ${guess}`
      
       if(cardsClass[0] == cardsClass[1]){
          cardsClass = [];
          cardsNumber += 2
          if(cardsNumber === cardsTotal){
            setTimeout(function(){
            alert('Congratulations You WON!!!');
            guessed.innerText = 'Guessed'}, 600);
              if(topScore === 0){
              topScore = guess;
              localStorage.setItem('topScore', topScore);
              }
              else if(guess < topScore){
              topScore = guess;  
              }
             localStorage.setItem('topScore', topScore);
            }
       }
            
        else{
        setTimeout(function(){ 
        
          let array1 =document.getElementsByClassName(cardsClass[0]);
          let card1 = array1[0]; 
          let array2 =document.getElementsByClassName(cardsClass[0]);
          let card2 = array2[1]; 
          let array3 = document.getElementsByClassName(cardsClass[1]);
          let card3 = array3[0]; 
          let array4 = document.getElementsByClassName(cardsClass[1]);
          let card4 = array4[1]; 
          
          card1.style.backgroundColor = 'white';
          card2.style.backgroundColor = 'white';
          card3.style.backgroundColor = 'white';
          card4.style.backgroundColor = 'white';
          cardsClass = [];
          }, 400)
      };
    }
  }
}

localStorage.setItem('topScore', 0);
start.addEventListener('click',function(){
       if (gameContainer.children.length === 0){
        const div = document.createElement("div");
        div.id = 'game'
        createDivsForColors(shuffledColors);
        }
});

// reset.addEventListener('click',function(e){
//             for(let i = 0; i < gameContainer.children.length; i++){
//                 gameContainer.children[i].remove();
//             }
     
// });

  




