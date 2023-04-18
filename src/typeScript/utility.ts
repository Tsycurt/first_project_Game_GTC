export function displayImg(image:string, imageHtmlId:string){
    let celebrityImg = document.getElementById(imageHtmlId) as HTMLImageElement;
    celebrityImg.src = image;
}