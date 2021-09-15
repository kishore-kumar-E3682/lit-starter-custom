import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styles } from './styles.css';
let FwButton = class FwButton extends LitElement {
    render() {
        return html `
            <button><slot></slot></button>
        `;
    }
};
FwButton.styles = [styles];
FwButton = __decorate([
    customElement('fw-button')
], FwButton);
export { FwButton };
//# sourceMappingURL=fw-button.js.map