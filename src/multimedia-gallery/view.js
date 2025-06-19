import GLightbox from 'glightbox';
import Splide from '@splidejs/splide';

// Default carousel styles
import '@splidejs/splide/css';

// Frontend styles
import './view.scss';

document.addEventListener( 'DOMContentLoaded', () => {

  // Init lightbox
  let i = 1;
  document.querySelectorAll( '.wp-block-maxgruson-multimedia-gallery' ).forEach( ( gallery ) => {
    gallery.querySelectorAll( '.multimedia-gallery__link' ).forEach( ( link ) => {
      link.setAttribute( `data-gallery-${i}`, '' );
    } );
    GLightbox( {
      selector: `data-gallery-${i}`,
      loop: true,
    } );
    i += 1;
  } );

  // Init carousel
  const splides = document.querySelectorAll( '.splide' );
  if(!!splides && splides.length > 0){
    window.splide = [];
    splides.forEach(splide => {
      const instance = new Splide(splide, {
        type: 'loop',
        // autoplay: true,
        perPage: 1,
        padding: '4em',
        gap: '1em',
        heightRatio: 0.5625
      } ).mount();
      window.splide.push( instance );
    } )
  }

  // Lazy load images
  const galleryImages =  document.querySelectorAll( '.wp-block-maxgruson-multimedia-gallery img' );
  galleryImages.forEach( el => {
    if ( el.complete ) {
      el.style.opacity = 1;
    } else {
      el.addEventListener( 'load', () => {
        el.style.opacity = 1;
      } );
    }
  } );
} );
