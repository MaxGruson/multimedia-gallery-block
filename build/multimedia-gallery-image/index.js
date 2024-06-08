(()=>{"use strict";const e=window.wp.blocks,i=window.React,t=window.wp.i18n,l=window.wp.blockEditor,a=window.wp.data,n=window.wp.components,r=window.wp.primitives,c=(0,i.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,i.createElement)(r.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M12 5.5A2.25 2.25 0 0 0 9.878 7h4.244A2.251 2.251 0 0 0 12 5.5ZM12 4a3.751 3.751 0 0 0-3.675 3H5v1.5h1.27l.818 8.997a2.75 2.75 0 0 0 2.739 2.501h4.347a2.75 2.75 0 0 0 2.738-2.5L17.73 8.5H19V7h-3.325A3.751 3.751 0 0 0 12 4Zm4.224 4.5H7.776l.806 8.861a1.25 1.25 0 0 0 1.245 1.137h4.347a1.25 1.25 0 0 0 1.245-1.137l.805-8.861Z"})),m=JSON.parse('{"N9":"maxgruson/multimedia-gallery-image"}');(0,e.registerBlockType)(m.N9,{edit:function({attributes:e,setAttributes:r}){const{imageID:m,imageURL:o}=e,s=(0,a.useSelect)((e=>{const i=m&&e("core").getMedia(m);return i?i.media_details.width:0}),[m]),d=(0,a.useSelect)((e=>{const i=m&&e("core").getMedia(m);return i?i.media_details.height:0}),[m]);return(0,i.createElement)(i.Fragment,null,(0,i.createElement)("li",{className:"multimedia-gallery__item"},(0,i.createElement)("figure",{...(0,l.useBlockProps)()},m&&o?(0,i.createElement)("div",{className:"img-container",style:{aspectRatio:s/d}},(0,i.createElement)("img",{className:"img-container__image",width:s,height:d,src:o}),(0,i.createElement)(n.Button,{icon:c,label:(0,t.__)("Afbeelding verwijderen","multimedia-gallery"),className:"trash-icon",onClick:()=>r({imageURL:null,imageID:null})})):(0,i.createElement)(l.MediaPlaceholder,{onSelect:e=>{r({imageURL:e.url,imageID:e.id})},allowedTypes:["image"],multiple:!1,labels:{title:(0,t.__)("Kies een afbeelding","multimedia-gallery")}}),(0,i.createElement)(l.RichText,{tagName:"figcaption",allowedFormats:["core/bold","core/italic","core/link"],value:e.description,onChange:e=>r({description:e}),placeholder:(0,t.__)("Omschrijving","multimedia-gallery")}))))}})})();