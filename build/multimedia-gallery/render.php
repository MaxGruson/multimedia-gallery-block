<?php
/**
 * Reactions block template.
 *
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 *
 * @package maxgruson/multimedia-gallery-block
 */

$inner_block_count = count( $block->inner_blocks );

if ( $inner_block_count > 1 ) {
	?>
	<div <?php echo get_block_wrapper_attributes( array( 'class' => 'splide' ) ); ?>>
		<div class="splide__track">
			<ul class="splide__list multimedia-gallery__list">
				<?php echo wp_kses_post( $content ); ?>
			</ul>
		</div>
	</div>
	<?php
} else {
	?>
	<div <?php echo get_block_wrapper_attributes(); ?>>
		<div>
			<ul class="multimedia-gallery__list">
				<?php echo wp_kses_post( $content ); ?>
			</ul>
		</div>
	</div>
	<?php
}
