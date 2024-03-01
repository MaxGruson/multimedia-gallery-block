<?php
/**
 * Reaction block template.
 *
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 *
 * @package maxgruson/multimedia-gallery-block
 */

namespace MULTIMEDIA_GALLERY_BLOCK;

$video_url = $attributes['videoURL'] ?? '';
$description = $attributes['description'] ?? '';
?>
<li <?php echo get_block_wrapper_attributes( array( 'class' => 'multimedia-gallery__item, multimedia-gallery__item--video, splide__slide' ) ); ?>>
	<figure>	
		<a
			class="multimedia-gallery__link no-external-link-indicator"
			href="<?php echo esc_url( $video_url ); ?>"
			<?php if ( ! empty( $description ) ) { ?>
			data-glightbox="description: <?php echo esc_attr( wp_kses_post( $description ) ); ?>"
			<?php } ?>
		>
			<div class='img-container'>
				<div class="play-button">
					<svg viewBox="0 0 18 18">
						<path d="M15.562 8.1L3.87.225c-.818-.562-1.87 0-1.87.9v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z"></path>
					</svg>
				</div>
				<img
					src="<?php echo esc_url( get_video_thumb( $video_url ) ); ?>" 
					loading="lazy" 
					decoding="async">
			</div>
		</a>
		<?php if ( ! empty( $description ) ) { ?>
			<figcaption class="glightbox-description"><?php echo wp_kses_post( $description ); ?></figcaption>
		<?php } ?>
	</figure>
</li>
