import {Element as PolymerElement,html} from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/iron-image/iron-image.js';
export class RdHome extends PolymerElement {

    static get properties(){
      return {
        db:{
          type:Object
        }
      };
    }
      // Define a string template instead of a `<template>` element.
    static get template() {
      return html`
      <style>
          :host {
          display: block;
          padding: 10px;
          }

          #homecontainer{
              list-style:none;
              margin:0 16px;
              padding:0;
              heigth:100%;
          }
          
          li{
              margin-bottom:2em;
          }

          li iron-image{
            width:100%;
            height:200px;
          }
          .meta{
              color:#ccc;
              margin-bottom:1em;
          }

          li .date{
              float:right;
          }
          h3{

          }
          a {
              text-decoration:none;
              color:#000;
          }
          .desc{
              text-align:justify;
              margin-bottom:1em;
          }
          .categories ul{
              list-style:none;
              margin:0;
              padding:0;
              display:inline;
          }
          .categories ul li{
              margin:0 0.5em 1em 0;
              display:inline-block;
              background-color:#F0F0F0;
              border:1px solid #CCC;
              padding:5px 1em;
          }
      </style>
  
      <ul id="homecontainer">
      <template is="dom-repeat" items="[[items]]" on-dom-change="initLazyLoadImages">
        <li>
          <iron-image class="thumbnails" prevent-load preload src="[[item.thumbnail]]" alt="[[item.title]]" sizing="cover" placeholder="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="></iron-image>
          <h3><a href="[[item.link]]">[[item.title]]</a></h3>
          <div class="meta"> <span class="date">[[formatDate(item.pubDate)]]</span><span class="author">[[item.author]]</span></div>
          <div class="desc">[[getFirstParagraph(item.content)]]</div>
          <div class="categories">
          Tagged with :
          <ul class="categories">
                <template is="dom-repeat" items="[[item.categories]]" as="category" index-as="cat_idx">
                    <li><a href="cat/[[category]]">[[category]]</a></li>
                </template>
          </ul>
          </div>
        </li>
      </template>
      </ul>`;
    }
    constructor(){
      super();
    }

    ready(){
        let el=this;
        super.ready();
        const getData = async () => {
            let feed=window.rssfeed;
            if(typeof feed=='undefined'){
                let resp= await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid');
                let feed= await resp.json();
            } 
            el.items=feed.items;
        };
        getData();
        const loadImage = ()=>{
            const config = {
                // If the image gets within 50px in the Y axis, start the download.
                rootMargin: '50px 0px',
                threshold: 0.01
                };
            this.observer=('IntersectionObserver' in window)?new IntersectionObserver(this.onIntersection, config):null;
        };
        setTimeout(loadImage,100);
        
    }
    getFirstParagraph(content){
        let firstPg=content.slice(0,content.indexOf('</p>',3)+4);
       let el = document.createElement('div');
       el.innerHTML=firstPg.replace(/<img .*?>/g,"");
       return el.querySelector('p').textContent;
    }

    formatDate(dateLong){
        let options = { year: '2-digit', month: 'long', day: 'numeric' };
        return new Date(dateLong).toLocaleString('en-ID',options);
    }

    static get properties() {
        return {
          items: Array,
          observer:Object
        };
      }
    
    
    
    
    
    onIntersection(entries) {
        // Loop through the entries
        entries.forEach(entry => {
          // Are we in viewport?
          if (entry.intersectionRatio > 0) {
            // Stop watching and load the image
            this.unobserve(entry.target);
            entry.target.preventLoad=false;
          } 
        });
      }
    
    initLazyLoadImages(){    
        const images=this.shadowRoot.querySelectorAll('.thumbnails');
        if (!('IntersectionObserver' in window)) {
            Array.from(images).forEach(image =>  el.preventLoad=false);
        } else {
            // It is supported, load the images through observer.
            
            Array.from(images).forEach(image => {
                this.observer.observe(image);
            });
        }
          
    }

  }
  
  customElements.define('rd-home', RdHome);