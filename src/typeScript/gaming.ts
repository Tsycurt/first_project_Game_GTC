import { setScoreBoard } from "./localstorage";
import { getConfiguration, getPeople, getPicture, getPlayerName } from "./networkCaller";


let disable = false;
let points = 0;
let failAttempt = 0;
let rounds = 0;
let failRound = 0;


window.addEventListener("load", setupRound);

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("newCelebrity");
    if (button) {
      button.addEventListener("click", setupRound);
    }
  });


async function roundStarter():Promise<Round> {
  const pageNumber = Math.floor(Math.random() * 10) + 1;
  const people = await getPeople(pageNumber);
  let person = people.results[Math.floor(Math.random() * people.results.length)];
  while(person.profile_path===null||person.profile_path===undefined||person.profile_path==="null"){
    person = people.results[Math.floor(Math.random() * people.results.length)];
  }
  const configuration = await getConfiguration();
  let celebrity: Celebrity;
  celebrity = { name: person.name, img: getPicture(person.profile_path, configuration.images.base_url),gender:person.gender };
  let names = people.results.filter((person)=>{
    if(person.gender === celebrity.gender && person.name!==celebrity.name){
      return person.name;
    }
  }).map((person)=>person.name);
  names = names.slice(0,5);
  names.push(celebrity.name);
  shuffleArray(names);

  let wordBank = {names:names};

  return {celebrity:celebrity,wordBank:wordBank};
}


export async function setupRound() {
  disable = false;
  rounds++;
  
  const round = await roundStarter();
  let celebrityImg = document.getElementById("celebrity-image") as HTMLImageElement;
  let divBtn =document.getElementById("divBtn") as HTMLDivElement;
  let divScore =document.getElementById("score") as HTMLDivElement;
  celebrityImg.src = round.celebrity.img;
  celebrityImg.classList.add("blur2");
  removeAllChildNodes(divBtn);
  round.wordBank.names.map((name)=>{
    let button = document.createElement("button");
    button.classList.add("btn", "btn-light", "w-25","border-dark","margin-25");
    button.innerText = name;
    button.addEventListener('click',()=>guessHandler(name,button,round,divScore,celebrityImg), false)
    divBtn.appendChild(button);

  });
}

function guessHandler(name:string,button:HTMLElement,round:Round,divScore:HTMLDivElement,celebrityImg:HTMLImageElement){
    if(!disable){
      if(name===round.celebrity.name){
        button.classList.remove( "btn-light");
        button.classList.add("btn-success" );
        disable = true;
        points=points+10;
        divScore.innerText = `${getPlayerName()} score ${points}` 
        nextRound(celebrityImg);
        
      }
      else{
        changeBlur();
        button.classList.remove("btn-light");
        button.classList.add("btn-danger");
        button.setAttribute("disabled","")
        failAttempt++;
        if(failAttempt === 2){
          failRound++;
          nextRound(celebrityImg);
          disable =true;
          // Highlight the correct answer
          const buttons = document.querySelectorAll(".btn");
          buttons.forEach((element: Element) => {
            if (element instanceof HTMLButtonElement) {
              const btn = element as HTMLButtonElement;
              if (btn.innerText === round.celebrity.name) {
                btn.classList.remove("btn-light");
                btn.classList.add("btn-success");
              }
            }
          });
        }
        
          
          const scoreDiv = document.getElementById("score") as HTMLDivElement;
          scoreDiv.textContent = `${getPlayerName()} Score: ${points}`;
        }

      }
}


  function removeAllChildNodes(parent:HTMLDivElement) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}



function nextRound(celebrityImg:HTMLImageElement){
  celebrityImg.classList.remove("blur2","blur1")
        setTimeout(() => {
          if (failRound === 3) {
            setScoreBoard({username:getPlayerName(),score:points})
            return location.href = `scoreboard.html` 
          }
          setupRound()
        }, 3000);
        failAttempt = 0 ;
}


function changeBlur(){
  let celebrityImg = document.getElementById("celebrity-image") as HTMLImageElement;
  
  if(celebrityImg.classList.contains("blur2")){
    celebrityImg.classList.add("blur1");
    celebrityImg.classList.remove("blur2");
    return ;
  }celebrityImg.classList.remove("blur1");

}


function shuffleArray(array:string[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


  


  







  

  



  
  