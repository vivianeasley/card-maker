import {html} from 'uhtml';
import {store} from "../store";
import {input} from "./input";
import {textBox} from "./text-box";
import {select} from "./select";
// import {multipleSelect} from "./multiple-selects";
import {imageUploader} from "./image-upload";
// import {ruleSet} from "./ruleset";
import piexif from "piexifjs";
// import {triggerOptions} from "../rules/triggers";
// import {targetPlayerOptions, targetCardOptions} from "../rules/targets";
// import {actionPlayerOptions, actionCardOptions} from "../rules/actions";

const { getState } = store; //getState, setState, 

export const app = async () => {
    const stats = await getState().stats;
    const setRank = await getState().updateRank;
    // const setImageX = await getState().setImageX;
    // const setImageY = await getState().setImageY;
    // const setImageWidth = await getState().setImageWidth;
    const updateValue = await getState().updateValue;
    const updateCost = await getState().updateCost;
    const deleteCost = await getState().deleteCost;
    const updateName = await getState().updateName;
    const updateType = await getState().updateType;
    const updateCardType = await getState().updateCardType;
    const updateDesigner = await getState().updateDesigner;
    const updateArtist = await getState().updateArtist;
    // const setTargetType = await getState().updateTargetType;
    const updateRules = await getState().updateRules;

    const download = () => {
      var link = document.createElement('a');
      const cardName = stats.name.split(' ').join('-');
      link.download = `${cardName}.jpg`;
      link.href = document.querySelector('#imageCanvas').toDataURL()
      link.click();
    }

    function addIcon (self) {
      const imageNode = document.querySelector('.all-icons-image');
      const widthChunk = imageNode.width/10;
      const heightChunk = imageNode.height/7;
      const x = self.offsetX;
      const y = self.offsetY;
      updateCost([Math.floor(x/widthChunk), Math.floor(y/heightChunk)])
    }

    return html`
    <h2 style="width: 100%">Editing Tools: <button style="float:right" onclick=${download}>Generate Card</button></h2>
    <hr/>
        ${input({title: 'Card name', placeholder: 'Card name', value: stats.name, handleKeyPress: (event)=>updateName(event.target.value)})}
    <hr/>
      <div>${input({title: 'Card Type', placeholder: '', value: stats.cardType, handleKeyPress: (event)=>updateCardType(event.target.value)})} </div>
    <hr/>
      ${input({title: 'Designer', placeholder: 'Your name or Reddit username', value: stats.designer, handleKeyPress: (event)=>updateDesigner(event.target.value)})}
    <hr/>
      ${input({title: 'Artist', placeholder: 'Artist', value: stats.artist, handleKeyPress: (event)=>updateArtist(event.target.value)})}
        ${await imageUploader()}
    <hr/>
    <div onclick=${(event)=>{if (event.target.type === "radio"); updateType(event.target.value)}}><!-- TODO: ignore non-radio button clicks -->
      <div>Card type:</div>
      <input type="radio" id="white" name="card-type" value="white" ?checked=${stats.type === "white"}>
      <label for="white">white</label> | 
      <input type="radio" id="blue" name="card-type" value="blue" ?checked=${stats.type === "blue"}>
      <label for="blue">blue</label> | 
      <input type="radio" id="black" name="card-type" value="black" ?checked=${stats.type === "black"}>
      <label for="black">black</label> | 
      <input type="radio" id="red" name="card-type" value="red" ?checked=${stats.type === "red"}>
      <label for="red">red</label> | 
      <input type="radio" id="green" name="card-type" value="green" ?checked=${stats.type === "green"}>
      <label for="green">green</label> | 
      <input type="radio" id="gold" name="card-type" value="gold" ?checked=${stats.type === "gold"}>
      <label for="gold">gold</label> | 
      <input type="radio" id="artifact" name="card-type" value="artifact" ?checked=${stats.type === "artifact"}>
      <label for="artifact">artifact</label>
      <input type="radio" id="land" name="card-type" value="land" ?checked=${stats.type === "land"}>
      <label for="land">land</label>
    </div>
    <hr/>
        <div>Rarity/Power Attributes:</div>
        <div>${input({title: 'Power & Toughness', placeholder: '', value: stats.value, handleKeyPress: (event)=>updateValue(event.target.value)})} </div>
        <div>${select({
            values: [["1","Common"],["2","Uncommon"],["3","Rare"],["4","Mythic"]], 
            title: "Rarity", 
            currentSelection: "1",
            handleOnChange: (event)=>{setRank(event.target.value)},
        })} </div>
        <div> 
        <details>
        <summary>Card Cost:</summary>
          <img src="/icons/mana.svg" class="all-icons-image" onclick=${addIcon}>
          <div><button onclick=${deleteCost}>Delete</button></div>
        </details>
        </div>
    <hr/>
    <div class="small-text">Click the "set rules" button to update rules text. Click the "generate card" button above to create card.</div> 
    `
}

// science - flip a face down card you control face up.
// tactical - deals 2 damage to each opponent.
// engineering - draw 1 card.
// medical - recover 1 card.




