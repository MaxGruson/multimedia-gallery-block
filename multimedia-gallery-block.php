<?php
/**
 * Plugin Name:       Multimedia Gallery Block
 * Description:       A block to add a gallery of images and/or YouTube/Vimeo-videos.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.5
 * Author:            <a href="https://max.gruson.studio" target="_blank">Max Gruson</a>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       multimedia-gallery
 *
 * @package           maxgruson/multimedia-gallery-block
 */

namespace MULTIMEDIA_GALLERY_BLOCK;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Create a wrapped image tag that's lazy loaded and responsive
 *
 * @param  integer $id      The attachment image id. Default the post thumbnail.
 * @param  string  $sizes   The HTML sizes attribute.
 *                          Default the automatic sizes attribute returned by WordPress.
 *                          E.g. "(max-width: 1440px) 100vw, 1440px".
 * @param  string  $maxsize The maximum image size. Must be an existing WordPress image size.
 *                          Default the full image, not cropped or resized.
 */
function image_wrapper( $id = null, $sizes = null, $maxsize = 'full' ) {
	if ( ! $id && has_post_thumbnail() ) {
		$id = get_post_thumbnail_id();
	}
	if ( wp_get_attachment_image_src( $id, $maxsize ) && ! $sizes ) {
		$sizes = wp_get_attachment_image_sizes( $id, $maxsize );
	}

	if ( wp_get_attachment_image_src( $id ) ) {
		$placeholder = wp_get_attachment_image_src( $id, 'tiny-lazyload-thumbnail' )[0];
		$src         = wp_get_attachment_image_src( $id, $maxsize )[0];
		$width       = wp_get_attachment_image_src( $id, $maxsize )[1];
		$height      = wp_get_attachment_image_src( $id, $maxsize )[2];
		$srcset      = wp_get_attachment_image_srcset( $id, $maxsize );
	}

	$alt = get_post_meta( $id, '_wp_attachment_image_alt', true );
	?>
	<div class="img-container" 
		style="background-image: url(<?php echo esc_attr( $placeholder ); ?>);
			<?php
			if ( $width && $height ) {
				$aspect_ratio = $width / $height;
			} else {
				$aspect_ratio = 1;
			}
			?>
			aspect-ratio: <?php echo $aspect_ratio; ?>;"
	>
		<img
			class="img-container__image 
			<?php
			if ( ! str_contains( get_post_mime_type( $id ), 'svg' ) ) {
				echo 'wp-image-' . esc_attr( $id );
			}
			?>
			"
			loading="lazy" 
			decoding="async"
			width="<?php echo esc_attr( $width ); ?>px"
			height="<?php echo esc_attr( $height ); ?>px"
			src="<?php echo esc_attr( $src ); ?>"
			srcset="<?php echo esc_attr( $srcset ); ?>"
			sizes="<?php echo esc_attr( $sizes ); ?>"
			alt="<?php echo esc_attr( $alt ); ?>"
			/>
	</div>
	<?php
}

/**
 * Get the url of an online video thumbnail image.
 *
 * @param  string $link  The URL to a online video. Supports Vimeo and YouTube.
 */
function get_video_thumb( $link ) {
	if ( false !== strpos( $link, 'vimeo' ) ) {
		$video_raw_data = wp_remote_retrieve_body( wp_remote_get( 'https://vimeo.com/api/oembed.json?url=' . rawurlencode( $link ) ) );
	} elseif ( false !== strpos( $link, 'youtu' ) ) {
		$video_raw_data = wp_remote_retrieve_body( wp_remote_get( 'https://youtube.com/oembed?format=json&url=' . rawurlencode( $link ) ) );
	}
	if ( ! empty( $video_raw_data ) ) {
		$video_data = json_decode( $video_raw_data );
		if ( ! empty( $video_data ) ) {
			$image_thumbnail_url = $video_data->thumbnail_url;
			if ( false !== strpos( $link, 'vimeo' ) ) {
				$image_thumbnail_url = preg_replace(
					'/_(.*)$/',
					'_1000',
					$image_thumbnail_url
				);
			} elseif ( false !== strpos( $link, 'youtu' ) ) {
				$max_res_url    = preg_replace(
					'/\w*.\w*$/',
					'maxresdefault.jpg',
					$image_thumbnail_url
				);
				$max_res_exists = wp_remote_retrieve_body( wp_remote_get( $max_res_url ) );
				if ( ! empty( $max_res_exists ) ) {
					$image_thumbnail_url = $max_res_url;
				}
			}
			return $image_thumbnail_url;
		}
	}
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function multimedia_gallery_block_init() {
	register_block_type( __DIR__ . '/build/multimedia-gallery' );
	register_block_type( __DIR__ . '/build/multimedia-gallery-image' );
	register_block_type( __DIR__ . '/build/multimedia-gallery-video' );
}
add_action( 'init', __NAMESPACE__ . '\multimedia_gallery_block_init' );
