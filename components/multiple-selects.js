import {html} from 'uhtml';
import {store} from "../store";
import {select} from "./select";
import {input} from "./input";

const { getState } = store; //getState, setState, 

export const multipleSelect = async (props, index, type, isAddDisabled) => {
    const addSelect = await getState().addSelect;
    const setRules = await getState().updateRules;
    const updateRuleValue = await getState().updateRuleValue;
    const removeRuleSelect = getState().removeRuleSelect
    const stats = await getState().stats;

    const rulesArray = stats.rules[index][type];

    return html`
    <div class="bordered">
        ${rulesArray.map((vals, typeIndex)=>{
            return html`<div>${select({values: props.values, 
                title: props.title, 
                currentSelection: vals[0], 
                handleOnChange: (event)=>{
                setRules(event.target.value, index, type, typeIndex);
            }})}
            ${
                typeIndex !== 0 ? 
                html`<button onclick=${()=>removeRuleSelect(type, index, typeIndex)}>-</button>`
                : ''}
            ${
                vals[0].includes('Amt') ? 
                html`${input({title: 'Amount', placeholder: 'Amount related to above action.', value: '1', handleKeyPress: (event)=>updateRuleValue(event.target.value, index, type, typeIndex)})}` 
                : ''
            }
            </div>`
        })}
        ${isAddDisabled ? '' : html`<div style="text-align:right"><button onclick=${()=>addSelect(index, type)}>+ ${type}</button></div>` }
    </div>
`
}
// TODO updateName should be add Amt