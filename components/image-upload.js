import {html} from 'uhtml';
import {store} from "../store";

const { getState } = store; //getState, setState, 

export const imageUploader = async () => {
    const setImageX = await getState().setImageX;
    const setImageY = await getState().setImageY;
    const setImageWidth = await getState().setImageWidth;
    
    function handleImage(e){
        const reader = new FileReader();
        reader.onload = function(event){
            const img = new Image();
            img.onload = function(){
                getState().setImage(img);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);     
    }

    const imageMoveDict = {
      "left": ()=>{setImageX(-1)},
      "up": ()=>{setImageY(-1)},
      "right": ()=>{setImageX(1)},
      "down": ()=>{setImageY(1)},
      "leftX2": ()=>{setImageX(-20)},
      "upX2": ()=>{setImageY(-20)},
      "rightX2": ()=>{setImageX(20)},
      "downX2": ()=>{setImageY(20)},
    }

    const imageSizeDict = {
      "bigger": ()=>{setImageWidth(1)},
      "biggerX2": ()=>{setImageWidth(20)},
      "smaller": ()=>{setImageWidth(-1)},
      "smallerX2": ()=>{setImageWidth(-20)},
    }

    return html`
    <div>
        Image upload: <input type="file" onchange=${handleImage} name="imageLoader"/>
        <div class="image-position-buttons-wrapper" onclick=${(event)=>imageMoveDict[event.target.dataset.move]()}> Position: 
            <button data-move="left">←</button>
            <button data-move="up">↑</button>
            <button data-move="right">→</button>
            <button data-move="down">↓</button>
            <button data-move="leftX2">↞</button>
            <button data-move="upX2">↟</button>
            <button data-move="rightX2">↠</button>
            <button data-move="downX2">↡</button>
        </div>
        <div class="image-size-buttons-wrapper" onclick=${(event)=>imageSizeDict[event.target.dataset.size]()}> Size: 
            <button data-size="bigger">+</button>
            <button data-size="biggerX2">++</button>
            <button data-size="smaller">-</button>
            <button data-size="smallerX2">--</button>
        </div>
    </div>

    `
}





