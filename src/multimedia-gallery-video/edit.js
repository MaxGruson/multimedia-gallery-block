/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

import { useState } from '@wordpress/element';

import { __experimentalInputControl as InputControl,  __experimentalInputControlPrefixWrapper as InputControlPrefixWrapper, Button, Placeholder } from '@wordpress/components';

import { trash, link } from '@wordpress/icons';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
async function getData( url ) {
	const response = await fetch( url );
	if (!response.ok) { 
		throw new Error('Network error');
	}
	const data = await response.json();
	return data;
}

export default function Edit({attributes, setAttributes}) {

	const {videoURL} = attributes;

	const [ thumbnailURL, setThumbnailURL ] = useState( false );

	const getThumbnail = ( videoURL ) => {
		if(videoURL && ! thumbnailURL) {
			if ( videoURL.includes( 'vimeo' ) ) {
				getData( 'https://vimeo.com/api/oembed.json?url=' + encodeURIComponent( videoURL ) ).then( data => {
					const newThumbnailURL = data.thumbnail_url.replace(
						/_(.*)$/,
						'_1000'
					);
					setThumbnailURL( newThumbnailURL );
				} ).catch( error => {
					console.error('There was a problem with the Fetch operation:', error);
				} );
			} else if ( videoURL.includes( 'youtu' ) ) {
				getData( 'https://youtube.com/oembed?format=json&url=' + encodeURIComponent( videoURL ) ).then( data => {
					const originalURL = data.thumbnail_url;
					const maxResURL = originalURL.replace(
						/\w*.\w*$/,
						'maxresdefault.jpg'
					);
					fetch( maxResURL )
					.then( response => {
						if (!response.ok) {
							throw new Error('Network error');
						}
						return response;
					} )
					.then( () => {
						setThumbnailURL( maxResURL );
					} )
					.catch( error => {
						console.error('There was a problem with the Fetch operation:', error);
						setThumbnailURL( originalURL );
					} );
				} ).catch( error => {
					console.error('There was a problem with the Fetch operation:', error);
				} );
			}
		}
	};
	getThumbnail( videoURL );

	return (
		<>
		{/* Main block zone */}
		<li className='multimedia-gallery__item'>
			<figure { ...useBlockProps() }>
				{ !! thumbnailURL ? (
					<div className='img-container' style={{backgroundImage: 'url(' + {thumbnailURL} + ')' }}>
						<img
							className='img-container__image'
							src={thumbnailURL}
						/>
						<Button
							disabled
							icon={<svg viewBox="0 0 18 18"><path d="M15.562 8.1L3.87.225c-.818-.562-1.87 0-1.87.9v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z"></path></svg>}
							className="play-button"
						>
						</Button>
						<Button
							icon={ trash }
							label={__( 'Afbeelding verwijderen', 'multimedia-gallery')}
							className='trash-icon'
							onClick={
								() => {
									setAttributes({videoURL: null});
									setThumbnailURL( false );
								}
							} 
						>
						</Button>
					</div>
				):(
					<Placeholder
						label={__('URL naar YouTube- of Vimeo-video', 'multimedia-gallery')}
					>
						<div>
							<InputControl
								value={videoURL}
								placeholder={__('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'multimedia-gallery')}
								prefix={<InputControlPrefixWrapper>{ link }</InputControlPrefixWrapper>}
								onChange={
									(videoURL) => {
										setAttributes({videoURL: videoURL});
										getThumbnail( videoURL );
									}
								}
							/>
						</div>
					</Placeholder>
				) }
				<RichText
					tagName='figcaption'
					allowedFormats={ ['core/bold', 'core/italic', 'core/link'] }
					value={ attributes.description }
					onChange={ (description) => setAttributes( { description: description } ) }
					placeholder={ __( 'Omschrijving', 'multimedia-gallery' ) }
				/>
			</figure>
		</li>
		{/* End Main block zone */}
		</>
	);
}
