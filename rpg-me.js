/**
 * Copyright 2024 ShyGuy2712
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

/**
 * `rpg-me`
 * 
 * @demo index.html
 * @element rpg-me
 */
export class RpgMe extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "rpg-me";
  }

  constructor() {
    super();
    this.title = "Create your own RPG-Character!"
    // object of all the aspects of RPG-Character
    this.settings = {
      seed: "0000000000",    // 10 char seed - one value for each attribute (legs is set to 0 and ignored)
      accessories: "0",
      base: "0",            // male: 0-4, female: 5-9
      leg: "0",             // Ignored, perma set to 0
      face: "0",
      faceItem: "0",
      hair: "0",
      pants: "0",
      shirt: "0",
      skin: "0",
      hatColor: "0",
      fire: false,        // boolean for if fire is shown (also makes character walk faster if true)
      walking: false,     // boolean for if character should be walking
      circle: false,      // boolean for if character has a circle around it
    }
    // link to this issue on GitHub
    this.issueLink = "https://github.com/haxtheweb/issues/issues/1414"
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      settings: { type: Object },
      issueLink: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--rpg-me-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <!-- div for character preview -->  
  <div class="preview">

  </div>
  <!-- div for input section -->
   <div class="input">

   </div>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(RpgMe.tag, RpgMe);