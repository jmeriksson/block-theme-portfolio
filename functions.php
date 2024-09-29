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
