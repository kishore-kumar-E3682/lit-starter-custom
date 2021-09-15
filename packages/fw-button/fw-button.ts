import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {styles} from './styles.css';

@customElement('fw-button')
export class FwButton extends LitElement {
    
    static styles = [styles];

    render() {
        return html`
            <button><slot></slot></button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'fw-button': FwButton;
    }
  }
