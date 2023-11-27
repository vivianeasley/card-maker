import {html} from 'uhtml';
import {store} from "../store";
import {multipleSelect} from "./multiple-selects";
import {triggerOptions} from "../options/triggers";
import {targetPlayerOptions, targetCardOptions} from "../options/targets";
import {actionPlayerOptions, actionCardOptions} from "../options/actions";
import {ownOptions} from "../options/owns";

const { getState } = store; //getState, setState, 

export const ruleSet = async (title, index) => {
    const stats = await getState().stats;
    const setTargetType = await getState().updateTargetType;

    return html`
    <div class="rules-wrapper">
      ${title}
        ${await multipleSelect({
            values: triggerOptions, 
            title: "Trigger",
        }, index, 'trigger')}
      <div onclick=${(event)=>{if (event.target.type === "radio"); setTargetType(event.target.value, index)}}><!-- TODO: ignore non-radio button clicks -->
        Targets: <input type="radio" id="targetPlayer" name="targeting-type" value="player" ?checked=${stats.target === "player"}>
        <label for="targetPlayer">Player</label>
        <input type="radio" id="targetCard" name="targeting-type" value="card" ?checked=${stats.target === "card"}>
        <label for="targetCard">Card</label>
      </div>
      ${
        stats.target === "player" ? 
        html`<div>
        ${await multipleSelect({
            values: targetPlayerOptions, 
            title: "Target Player",
        }, index, 'target')}
      </div>
      <div>
      ${await multipleSelect({
            values: actionPlayerOptions, 
            title: "Action",
        }, index, 'action')}
      </div>`:
      html`
      <div>
      ${await multipleSelect({
          values: targetCardOptions, 
          title: "Target Card",
      }, index, 'target')}
      </div>
      <div>
      ${await multipleSelect({
          values: ownOptions, 
          title: "Owned by",
      }, index, 'own', true)}
      </div>
      <div>
      ${await multipleSelect({
        values: actionCardOptions, 
        title: "Action",
    }, index, 'action')}
      </div>`
      }
      </div>
    `
}

// science - flip a face down card you control face up.
// tactical - deals 2 damage to each opponent.
// engineering - draw 1 card.
// medical - recover 1 card.



