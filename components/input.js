import {html} from 'uhtml';

export const input = ({title, placeholder, value, handleKeyPress}) => html`
<div>
    ${title}${title ? ':' : ''} <input type="text" placeholder="${placeholder}" value="${value}" onkeyup=${handleKeyPress}>
</div>
`