import {html, render} from 'uhtml';
import {app} from "./components/editing-tools";
import {store} from "./store";

const { subscribe, getState } = store;

let allBorderNodes = document.querySelectorAll(".border-image");
let allRankNodes = document.querySelectorAll(".rank-image");
let allTypeNodes = document.querySelectorAll(".type-image");
let allCircleIconNodes = document.querySelectorAll(".circle-icon");
let allIconNode = document.querySelector(".all-icons");
let toolsNode = document.querySelector("#app")
let canvas = document.getElementById('imageCanvas');
let ctx = canvas.getContext('2d');


const borderImages = {
  white: allBorderNodes[0],
  blue: allBorderNodes[1],
  black: allBorderNodes[2],
  red: allBorderNodes[3],
  green: allBorderNodes[4],
  gold: allBorderNodes[5],
  artifact: allBorderNodes[6],
  land: allBorderNodes[7],
}

const rankImages = {
  "1": allRankNodes[0],
  "2": allRankNodes[1],
  "3": allRankNodes[2],
  "4": allRankNodes[3],
}

const typeImages = {
  tactical: allTypeNodes[0],
  engineer: allTypeNodes[1],
  science: allTypeNodes[2],
  medical: allTypeNodes[3],
}

const rankLookup = {
  '1':'Cadet',
  '2':'Ensign',
  '3':'Lieutenant',
  '4':'Captain',
}


if (document.getElementById('imageCanvas')) {
  allBorderNodes = document.querySelectorAll(".border-image");
  allRankNodes = document.querySelectorAll(".rank-image");
  allTypeNodes = document.querySelectorAll(".type-image");
  allCircleIconNodes = document.querySelectorAll(".circle-icon");
  allIconNode = document.querySelector(".all-icons");
  toolsNode = document.querySelector("#app")
  canvas = document.getElementById('imageCanvas');
  ctx = canvas.getContext('2d');
}
renderApp();


window.addEventListener("load", renderApp);

subscribe(renderApp);

async function renderApp () {
    render(toolsNode, html`${await app()}`);
    drawCardDetails();
}

document.querySelector("#set-rules").addEventListener('click', (self) => {
  drawCardDetails();
  const sourceCanvas = document.querySelector(".carotaEditorCanvas");
  ctx.drawImage(sourceCanvas, 100, 660, 590, 450);
})

// TODO: move out of this file
function drawCardDetails () {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  const stats = getState().stats;
  const imageNode = stats.img.img;

  if (imageNode) {
    const ratio = imageNode.height/imageNode.width;
    ctx.drawImage(imageNode,0 ,0, imageNode.width, imageNode.height, stats.img.x, stats.img.y, stats.img.width, stats.img.width*ratio); // TODO: set x and y from store and width
  }
  if (borderImages[stats.type]) ctx.drawImage(borderImages[stats.type],0,0); // TODO: set with chosen border

  // ctx.drawImage(rankImages[stats.rank],0,0, 255, 253, 640, 575, 100, 100);  // TODO: set with chosen border

  ctx.font = "36px 'EB Garamond', serif";
  ctx.fillStyle = "#000";
  ctx.fillText(`${capitalizeFirst(stats.cardType)}`, 81, 637);
  ctx.fillStyle = "#fff";
  ctx.fillText(`${capitalizeFirst(stats.cardType)}`, 80, 636);

  ctx.font = "60px 'EB Garamond', serif";
  ctx.fillStyle = "#000";
  ctx.fillText(stats.value, 642, 1027); // Shadow
  ctx.fillStyle = "#fff";
  ctx.fillText(stats.value, 640, 1025);

  ctx.font = "40px 'MedievalSharp', cursive";
  ctx.fillStyle = "#000";
  ctx.fillText(stats.name, 76, 86);
  ctx.fillStyle = "#fff";
  ctx.fillText(stats.name, 75, 85);


  ctx.font = "30px 'EB Garamond', serif";
  ctx.fillStyle = "#000";

  if (stats.rank === '1' && stats.type !== 'land') {
    ctx.fillText(`Basic landcycling       (     , Discard this card: Search`, 100, 890);
    ctx.fillText(`your library for a basic land card, reveal it, put it`, 100, 920);
    ctx.fillText(`into your hand, then shuffle.)`, 100, 950);
    ctx.drawImage(allCircleIconNodes[1],0,0, 120, 120, 300, 867, 100, 100);
    ctx.drawImage(allCircleIconNodes[1],0,0, 120, 120, 344, 867, 100, 100);
  
  }
  if (stats.type === 'land') {
    ctx.fillText(`Cycling       (     , Discard this card: Draw a card.)`, 100, 940);
    ctx.drawImage(allCircleIconNodes[2],0,0, 120, 120, 195, 918, 100, 100);
    ctx.drawImage(allCircleIconNodes[2],0,0, 120, 120, 238, 918, 100, 100);
  
  }

  ctx.font = "14px 'EB Garamond', serif";
  ctx.fillStyle = "#adadad";
  ctx.fillText("✎ " + stats.designer + " ⦾ " + stats.artist, 80, 1073);

  const startX = 685;
  let iterator = 0;

  const iconsCostArr = [...stats.cost].reverse()
  for (let costIndex = 0; costIndex < iconsCostArr.length; costIndex++) {
    const coordinates = iconsCostArr[costIndex];

    ctx.drawImage(allIconNode,coordinates[0]*105,coordinates[1]*105.2, 105, 100, (startX - (iterator*45)), 50, 41, 41);
    iterator++;
  }
}

function capitalizeFirst(string) {
  if (typeof string !== 'string') return
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getLines(ctx, text, maxWidth) {
  var words = text.split(" ");
  var lines = [];
  var currentLine = words[0];

  for (var i = 1; i < words.length; i++) {
      var word = words[i];
      var width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
          currentLine += " " + word;
      } else {
          lines.push(currentLine);
          currentLine = word;
      }
  }
  lines.push(currentLine);
  return lines;
}
