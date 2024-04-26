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

$image_id    = $attributes['imageID'] ?? '';
$image_url   = $attributes['imageURL'] ?? '';
$description = $attributes['description'] ?? '';
?>
<li <?php echo get_block_wrapper_attributes( array( 'class' => 'multimedia-gallery__item multimedia-gallery__item--image splide__slide' ) ); ?>>
	<figure>
		<a
			class="multimedia-gallery__link no-external-link-indicator"
			href="<?php echo esc_url( wp_get_attachment_image_src( $image_id, 'full' )[0] ); ?>"
			<?php if ( ! empty( $description ) ) { ?>
			data-glightbox="description: <?php echo esc_attr( wp_kses_post( $description ) ); ?>"
			<?php } ?>
		>
			<?php image_wrapper( $image_id, null, 'full' ); ?>
		</a>
		<?php if ( ! empty( $description ) ) { ?>
			<figcaption class="glightbox-description"><?php echo wp_kses_post( $description ); ?></figcaption>
		<?php } ?>
	</figure>
</li>
