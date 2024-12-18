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
    const urlParams = new URLSearchParams(window.location.search);
    const urlseed = urlParams.get('seed');
    console.log(urlseed);
    if (urlseed) {
      this.seed = urlseed;
    }
    else {
      this.seed = "0000000000";
    }
    // object of all the aspects of RPG-Character
    this.settings = {
      accessories: 0,
      base: 0,            // male: 0-4, female: 5-9
      leg: 0,             // Ignored, perma set to 0
      face: 0,
      faceItem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      hatColor: 0,
      hat: "none",
      fire: false,        // boolean for if fire is shown (also makes character walk faster if true)
      walking: false,     // boolean for if character should be walking
      circle: false,      // boolean for if character has a circle around it
      size: 200,           // number of px character takes up (default = 200)
    };
    this.issueLink = "https://github.com/haxtheweb/issues/issues/1414"      // link to this issue on GitHub
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      seed: { type: String },
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
        background-color: var(--ddd-theme-default-limestoneGray);
        font-family: var(--ddd-font-navigation);
        padding: var(--ddd-spacing-4);
        --rpg-character-scale: 2.5;
      }
      /* CSS for overall app */
      .wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: center;
        padding: var(--ddd-spacing-p-10)
      }
      /* CSS for character display */
      .preview {
        background-color: var(--ddd-theme-default-keystoneYellow);
        color: var(--ddd-theme-default-coalyGray);
        min-width: 300px;
        text-align: center;
        border: 4px solid var(--ddd-theme-default-wonderPurple);
        border-radius: 8px;
        padding: var(--ddd-spacing-6);
        margin: var(--ddd-spacing-2);
      }
      /* CSS for input section */
      .input {
        background-color: var(--ddd-theme-default-original87Pink);
        color: var(--ddd-theme-default-roarMaxlight);
        border: 4px solid var(--ddd-theme-default-wonderPurple);
        padding: var(--ddd-spacing-6);
        margin: var(--ddd-spacing-2);
      }
      /* Spacing for wired items */
      wired-combo,
      wired-checkbox,
      wired-slider {
        display: block;
        padding: var(--ddd-spacing-p-4);
        margin: var(--ddd-spacing-p-4);
      }
      /* CSS to allow chaning rpg-character's size */
      .preview rpg-character {
        height: var(--character-size, 200px);
        width: var(--character-size, 200px);
        transition: height 0.3s ease, width 0.3 ease;
      }
      /* Disable leg slider */
      #leg {
        opacity: 0.4;
        pointer-events: none;
      }
      /* Just to make the drop downs show the list */
      wired-item {
        opacity: 1;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <!-- div for character preview -->  
  <div class="preview">
    <div class="issueLink">Look at this issue on GitHub: <a href="${this.issueLink}" target="_blank">ISSUE</a></div>
    <div class="seed">Seed: ${this.seed}</div>
    <rpg-character
      accessories="${this.settings.accessories}"
      base="${this.settings.base}"
      leg="${this.settings.leg}"
      face="${this.settings.face}"
      faceItem="${this.settings.faceItem}"
      hair="${this.settings.hair}"
      pants="${this.settings.pants}"
      shirt="${this.settings.shirt}"
      skin="${this.settings.skin}"
      hatColor="${this.settings.hatColor}"
      hat="${this.settings.hat}"
      .fire="${this.settings.fire}"
      .walking="${this.settings.walking}"
      .circle="${this.settings.circle}"
      style="
        --character-size: ${this.settings.size}px;
        --hat-color: hsl(${this.settings.hatColor}, 100%, 50%);
      "
      ></rpg-character>
  </div>

  <!-- div for input section -->
   <div class="input">

  <!-- Toggle for hair (base setting) -->
    <wired-checkbox
      id="toggleHair"
      ?checked="${this.settings.base === 1}"
      @change="${(e) =>
        this._updateSettings("base", e.target.checked ? 1 : 0)
      }"
      >Has Hair</wired-checkbox>

  <!-- Slider for accessories -->
    <label for="accessories">Accessories:</label>
    <wired-slider
      id="accessories"
      value="${this.settings.accesories}"
      min="0"
      max="9"
      @change="${(e) =>
        this._updateSettings("accessories", parseInt(e.detail.value))
      }"
    ></wired-slider>

  <!-- Slider for leg (DISABLED) -->
      <label for="leg">Leg:</label>
      <wired-slider
        id="leg"
        value="${this.settings.leg}"
        min="0"
        max="9"
        @change="${(e) =>
          this._updateSettings("leg", parseInt(e.detail.value))
        }"
      ></wired-slider>
  
  <!-- Slider for which face -->
    <label for="face">Face:</label>
    <wired-slider
      id="face"
      value="${this.settings.face}"
      min="0"
      max="5"
      @change="${(e) =>
        this._updateSettings("face", parseInt(e.detail.value))
      }"
    ></wired-slider>

  <!-- Slider for face item -->
    <label for="faceItem">Face Item:</label>
    <wired-slider
      id="faceItem"
      value="${this.settings.faceItem}"
      min="0"
      max="9"
      @change="${(e) =>
        this._updateSettings("faceItem", parseInt(e.detail.value))
      }"
    ></wired-slider>

  <!-- Slider for pant color -->
    <label for="pants">Pants:</label>
    <wired-slider
      id="pants"
      value="${this.settings.pants}"
      min="0"
      max="9"
      @change="${(e) =>
        this._updateSettings("pants", parseInt(e.detail.value))
      }"
    ></wired-slider>

  <!-- Slider for shirt color -->
    <label for="shirt">Shirt:</label>
    <wired-slider
      id="shirt"
      value="${this.settings.shirt}"
      min="0"
      max="9"
      @change="${(e) =>
        this._updateSettings("shirt", parseInt(e.detail.value))
      }"
    ></wired-slider>

  <!-- Slider for skin color -->
    <label for="skin">Skin Color:</label>
    <wired-slider
      id="skin"
      value="${this.settings.skin}"
      min="0"
      max="9"
      @change="${(e) =>
        this._updateSettings("skin", parseInt(e.detail.value))
      }"
    ></wired-slider>

  <!-- Slider for hat color -->
    <label for="hatColor">Hat Color:</label>
    <wired-slider
      id="hatColor"
      value="${this.settings.hatColor}"
      min="0"
      max="9"
      @change="${(e) =>
        this._updateSettings("hatColor", parseInt(e.detail.value))
      }"
    ></wired-slider>

  <!-- Selector for hat -->
   <label for="hat">Hat:</label>
   <wired-combo
      .selected="${this.settings.hat}"
      @selected="${(e) =>
        this._updateSettings('hat', e.detail.selected)
      }">
      <wired-item value="none">Default</wired-item>
      <wired-item value="bunny">Bunny</wired-item>
      <wired-item value="coffee">Coffee</wired-item>
      <wired-item value="construction">Construction</wired-item>
      <wired-item value="cowboy">Cowboy</wired-item>
      <wired-item value="education">Education</wired-item>
      <wired-item value="knight">Knight</wired-item>
      <wired-item value="ninja">Ninja</wired-item>
      <wired-item value="party">Party Hat</wired-item>
      <wired-item value="pirate">Pirate</wired-item>
      <wired-item value="watermelon">Watermelon</wired-item>
  </wired-combo>

  <!-- Slider for character size -->
   <label for="characterSize">Character Size:</label>
   <wired-slider
      id="characterSize"
      value="${this.settings.size}"
      min="100"
      max="600"
      @change="${(e) =>
        this._updateSettings("size", parseInt(e.detail.value))
      }"
   ></wired-slider>

  <!-- Checkbox for if character is on fire -->
    <wired-checkbox
      id="fire"
      ?checked="${this.settings.fire}"
      @change="${(e) =>
        this._updateSettings("fire", e.target.checked)
      }"
    >On Fire</wired-checkbox>

  <!-- Checkbox for if character is walking -->
    <wired-checkbox
      id="walking"
      ?checked="${this.settings.walking}"
      @change="${(e) =>
        this._updateSettings("walking", e.target.checked)
      }"
    >Walking</wired-checkbox>

  <!-- Checkbox for if character is in a circle -->
    <wired-checkbox
      id="circle"
      ?checked="${this.settings.circle}"
      @change="${(e) =>
        this._updateSettings("circle", e.target.checked)
      }"
    >Circle</wired-checkbox>
    
    <button @click="${this._createLink}">
      Share your Character!
    </button>
   </div>
</div>`;
  }

  // applies seed to character
  _applySeed() {
    const seed = this.seed;
    const paddedSeed = seed.padStart(10, "0").slice(0, 10);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));
    
    [
      this.settings.accessories,
      this.settings.base,
      this.settings.leg,
      this.settings.face,
      this.settings.faceItem,
      this.settings.hair,
      this.settings.pants,
      this.settings.shirt,
      this.settings.skin,
      this.settings.hatColor
    ] = values;

    this.requestUpdate();   // ensures that preview updates after applying the settings
  }

  // creates the seed based off of inputs
  _createSeed() {
    const { accessories, base, leg, face, faceItem, hair, pants, shirt, skin, hatColor } = this.settings;
    this.seed = `${accessories}${base}${leg}${face}${faceItem}${hair}${pants}${shirt}${skin}${hatColor}`
  }

  // updates settings when called
  _updateSettings(key, value) {
    this.settings = { ...this.settings, [key]: value };
    this._createSeed();
    this.requestUpdate();
  } 

  // creates link to share with your friends (also copies it)
  _createLink() {
    const link = `${location.origin}${location.pathname}?seed=${this.seed}&hat=${this.settings.hat}&fire=${this.settings.fire}&walking=${this.settings.walking}&circle=${this.settings.circle}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  }

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);

    if (params.has("seed")) {
      this.seed = params.get("seed");
      this._applySeed();    // Applies seed to settings
    }
    console.log("Seed on page load:", this.seed);
    this.requestUpdate();
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