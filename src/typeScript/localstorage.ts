const storageKey = "scoreBoard"; 
export function  getStoredScoreboard():PlayerScore[]{
    const scoreBoardStr = localStorage.getItem(storageKey);
    if(scoreBoardStr === null){
        return [];
    }
    else{
        const scoreBoard = JSON.parse(scoreBoardStr);
        return scoreBoard
    }
}

export function setScoreBoard(playerScore:PlayerScore){
    const scoreBoard = getStoredScoreboard();
    if(scoreBoard.some((score)=>playerScore.username===score.username)){
        const index = scoreBoard.findIndex((score)=>playerScore.username===score.username)
        if(scoreBoard[index].score>playerScore.score){
            return;
        }
        scoreBoard[index] = playerScore;
    }   
    else{
        scoreBoard.push(playerScore);
    }
    localStorage.setItem(storageKey, JSON.stringify(scoreBoard));
}