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
import { useBlockProps, MediaPlaceholder, RichText } from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

import { Button } from '@wordpress/components';

import { trash } from '@wordpress/icons';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {

	const {imageID, imageURL} = attributes;

	const imageWidth = useSelect( select => {
		const image = imageID && select( 'core' ).getMedia( imageID );
		return image ? image.media_details.width : 0;
	}, [ imageID ] );

	const imageHeight = useSelect( select => {
		const image = imageID && select( 'core' ).getMedia( imageID );
		return image ? image.media_details.height : 0;
	}, [ imageID ] );

	return (
		<>
		{/* Main block zone */}
		<li className='multimedia-gallery__item'>
			<figure { ...useBlockProps() }>
				{!!imageID && !!imageURL ? (
					<div className='img-container' style={{aspectRatio: imageWidth / imageHeight}}>
						<img
							className='img-container__image'
							width={imageWidth}
							height={imageHeight}
							src={imageURL}
						/>
						<Button
							icon={ trash }
							label={__( 'Afbeelding verwijderen', 'multimedia-gallery')}
							className='trash-icon'
							onClick={() => setAttributes({imageURL: null, imageID: null})} 
						>
						</Button>
					</div>
				):(
					<MediaPlaceholder
						onSelect={
							( selectedImage ) => {
								setAttributes( { imageURL: selectedImage.url, imageID: selectedImage.id } );
							}
						}
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ { title: __( 'Kies een afbeelding', 'multimedia-gallery') } }
					/>
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
