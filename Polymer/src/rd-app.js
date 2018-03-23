import {Element as PolymerElement,html} from '../node_modules/@polymer/polymer/polymer-element.js';

import '../node_modules/@polymer/iron-selector/iron-selector.js';
import '../node_modules/@polymer/iron-icons/iron-icons.js';
import '../node_modules/@polymer/iron-icon/iron-icon.js';
import '../node_modules/@polymer/iron-media-query/iron-media-query.js';

import '../node_modules/@polymer/app-route/app-location.js';
import '../node_modules/@polymer/app-route/app-route.js';
import '../node_modules/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '../node_modules/@polymer/app-layout/app-drawer/app-drawer.js';
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../node_modules/@polymer/app-layout/app-scroll-effects/effects/waterfall.js';

import '../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../node_modules/@polymer/paper-listbox/paper-listbox.js';
import '../node_modules/@polymer/paper-item/paper-item.js';

import './rd-home.js';
// Added "export" to export the MyApp symbol from the module
export class RdApp extends PolymerElement {

    // Define a string template instead of a `<template>` element.
    static get template() {
      return html`
      <style>
      :host {
        --app-primary-color: #4285f4;
        --app-secondary-color: black;
  
        display: block;
      }
  
      a {
        text-decoration: none;
        font-size: inherit;
        color:var(--main-color);
      }
      #wide-toolbar {
        @apply(--layout-horizontal);
        @apply(--layout-justified);
      }
      .toolbar{
        background-color: rgba(255, 255, 255, 0.95);
      }
      paper-tabs {
        height: 100%;
        @apply(--layout-end-justified);
        --paper-tabs-selection-bar-color:var(--main-color);
        font-size: 1em;
      }
      paper-tabs a {
        line-height: 64px;
        font-weight: normal;
      }
      #logo{
        margin-right: 10px;
        height: 30px;
        @apply(--layout-start);
      }
      #logo img{
        height: 30px;
      }
      
      section p.learnmore{
        text-align: center;
      }
      
      section {
        padding: 66px 16px;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
      }
      .container-full{
        max-width: 100%;
        padding: 16px;
      }
      .container > * {
  
      }
      .container img {
        max-width: 100%;
        max-height: 100%;
      }
      .container h3,.container-full h3 {
        font-size: 32px;
        font-weight: 300;
        margin: 24px 0;
        text-align: center;
        color: var(--main-color);
        text-transform:capitalize; 
      }
      .container p,.container-full p {
        text-align: justify;
      }
      
      
      
      drawer a{
        display: block;
      }
      footer{
        
        background-color: var(--main-color);
        color: #FFF;
        margin-bottom: -16px;
        padding:32px;
      }
      footer .container p{
        text-align: center;
      }
      footer .social-media a{
        padding 0 10px;
      }
      h4{
        padding: 15px 20px 15px 45px;
        margin: 0 0 20px;
        position: relative;
        text-align: center;
        font-size: 1.4em;
        font-weight: normal;
        color: #333;
      }
      
       
      
      @media (max-width: 640px) {
        .container {
          @apply(--layout-vertical);
        }
        header #overview{
          font-size: 14px;
        }
        header h2 {
        font-size: 32px;
        font-weight: 100;
        margin: 0;
        line-height: 1.5em;
        
        }
        header p {
          font-size: 24px;
          line-height: 1.8em;
     
        }
        header #overview{
          font-size: 16px;
        }
        header paper-button{
          
        }
        header iron-icon{
          padding-right: 16px;
          display: inline-block;
          height: 32px;
          width: 32px;
          vertical-align: bottom;
        }
        #teams-list {
          flex-direction: column;
        }
        #teams-list .team{
          width: 100%;
          margin-bottom: 3em;
        }
        
      }
      [hidden] {
        display: none !important;
      }
    </style>
  
    <app-location route="{{route}}"></app-location>
    <app-route
        route="{{route}}"
        pattern="[[rootPattern]]:page"
        data="{{routeData}}"
        tail="{{subroute}}"></app-route>
  
        <iron-media-query query="min-width: 600px" query-matches="{{wideLayout}}"></iron-media-query>
        
    
        <app-drawer-layout force-narrow="">
          <app-drawer id="drawer" swipe-open slot="drawer">
            <app-toolbar>
              WWWID
            </app-toolbar>
            <!-- Nav on mobile: side nav menu -->
            <paper-listbox selected="{{selected}}" attr-for-selected="name" on-iron-select="gotoSection">
              <a href="/"><paper-item>Home</paper-item></a>
            </paper-listbox>
          </app-drawer>
  
          <app-header-layout>
            <app-header slot="header" reveals="" effects="waterfall">
              <app-toolbar class="toolbar" hidden$="{{wideLayout}}">
                <paper-icon-button class="menu-button" icon="menu" drawer-toggle></paper-icon-button>
                <div main-title>
                  WWWID
                </div>
              </app-toolbar>
    
              <app-toolbar id="wide-toolbar" class="toolbar" hidden$="{{!wideLayout}}">
              <a id="wide-logo" href="https://github.com/GoogleChrome/lighthouse">
                WWWID
              </a>
                <paper-tabs selected="{{selected}}" attr-for-selected="name">
                  <paper-tab name$="{{item.target}}"><a href="/">Home</a></paper-tab>
                </paper-tabs>
              </app-toolbar>
            </app-header>
            <rd-home></rd-home>
      </app-header-layout>
    </app-drawer-layout>`;
    }
  
    // properties, observers, etc. are identical to 2.x
    static get properties() {
      return {
        page: {
          type: String,
          reflectToAttribute: true
        },
        wideLayout: {
          type: Boolean,
          value: false,
          observer: '_onLayoutChange',
        },
        rootPattern: String,
        routeData: Object,
        subroute: String,
      };
    }
  
    static get observers() {
      return [
        '_routePageChanged(routeData.page)',
      ];
    }
  
    constructor() {
      super();
  
      // Get root pattern for app-route, for more info about `rootPath` see:
      // https://www.polymer-project.org/2.0/docs/upgrade#urls-in-templates
      this.rootPattern = (new URL(this.rootPath)).pathname;
    }
  
    _routePageChanged(page) {
      // Polymer 2.0 will call with `undefined` on initialization.
      // Ignore until we are properly called with a string.
      if (page === undefined) {
        return;
      }
  
      // If no page was found in the route data, page will be an empty string.
      // Deault to 'view1' in that case.
      this.page = page || 'home';
  
      // Close a non-persistent drawer when the page & route are changed.
      if (!this.$.drawer.persistent) {
        this.$.drawer.close();
      }
    }
  
    _onLayoutChange(wide) {
      var drawer = this.$.drawer;
      if (wide && drawer.opened) {
          drawer.opened = false;
      }
    }
    
  
    _showPage404() {
      this.page = 'view404';
    }
  }
  
  customElements.define('rd-app', RdApp);