<?php
/**
 * Functions and definitions
 * 
 * @package btp
 */

/**
 * Enqueue the style.css file.
 */
function btp_style()
{
    wp_enqueue_style(
        'btp-style',
        get_stylesheet_uri(),
        [],
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'wp_enqueue_scripts', 'btp_style' );

/**
 * Register blocks that are included in the theme.
 *
 * @return void
 */
function btp_register_theme_blocks()
{
    register_block_type( dirname(__FILE__) . '/src/blocks/menu-list/build/block.json' );
    register_block_type( dirname(__FILE__) . '/src/blocks/portfolio-header/build/block.json' );
}
add_action( 'init', 'btp_register_theme_blocks' );
