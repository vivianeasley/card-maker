import {html} from 'uhtml';

export const textBox = ({title, placeholder, value, handleKeyPress}) => html`
<div>
    <div>${title}${title ? ':' : ''} </div>
    <textarea placeholder="${placeholder}" onkeyup=${handleKeyPress} rows="6" cols="40">
        ${value}
    </textarea>
</div>
`