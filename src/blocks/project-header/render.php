<?php
/**
 * Block render callback.
 *
 * @package btp
 */
?>

<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php esc_html_e( 'Project Header – hello from a dynamic block!', 'project-header' ); ?>
</p>
