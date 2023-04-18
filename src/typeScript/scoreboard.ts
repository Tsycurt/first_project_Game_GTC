import { getStoredScoreboard } from "./localstorage";

export function renderScoreboard(): void {
    const scoreboardContainer = document.getElementById("scoreboard");
    if (scoreboardContainer === null) {
      return;
    }
  
    const scoreboard = getStoredScoreboard();
    scoreboard.sort((a, b) => b.score - a.score);
  
    
      
        scoreboard.forEach((user) => {
          const li = document.createElement('li');
          const nameSpan = document.createElement('span');
          const scoreSpan = document.createElement('span');
      
          nameSpan.textContent = `${user.username}: `;
          scoreSpan.textContent = user.score.toString();
      
          nameSpan.classList.add('name');
          nameSpan.classList.add('fs-3');
          nameSpan.classList.add('fw-bold');
          nameSpan.classList.add('w-75');
          nameSpan.classList.add('h-75');
          
          scoreSpan.classList.add('score');
          scoreSpan.classList.add('fs-3');
          
      
          li.appendChild(nameSpan);
          li.appendChild(scoreSpan);
          scoreboardContainer.appendChild(li);
        });


  }

  window.addEventListener("load", renderScoreboard);

