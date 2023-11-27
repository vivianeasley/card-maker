import {html} from 'uhtml';

export const select = ({values, title, currentSelection, handleOnChange}) => {

    return html`
    <div class="select-wrapper">
        ${title}${title ? ':' : ''}
        <select onchange=${handleOnChange}>
            ${values.map((value)=> {
                return html`<option value="${value[0]}" ?selected=${currentSelection === value[0]}>${value[1]}</option>`
            })}
        </select>          
    </div>
`
}