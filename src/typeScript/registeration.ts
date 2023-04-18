export function onClickStartGame(){
    let player = (document.getElementById("UserName") as HTMLInputElement).value;
    return location.href = `gaming.html?UserName=${player}`;
  }
