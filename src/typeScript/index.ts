
import { getConfiguration, getPeople, getPicture } from "./networkCaller";
import {onClickStartGame} from "./registeration";
import { displayImg } from "./utility";


window.addEventListener("load",getCelebPic)

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("startGame");
    if (button) {
      button.addEventListener("click", onClickStartGame);
    }
  });

async function getCelebPic(){
  const celeb = await getPeople(1);
  const configuration = await getConfiguration();
  let person = celeb.results[Math.floor(Math.random() * celeb.results.length)];
  while(person.profile_path===null||person.profile_path===undefined||person.profile_path==="null"){
    person = celeb.results[Math.floor(Math.random() * celeb.results.length)];
  }
  const img = getPicture(person.profile_path, configuration.images.base_url)
  displayImg(img, "celebrity-image")
}
