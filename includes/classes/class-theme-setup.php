<?php
/**
 * Handles the basic setup of the theme.
 * 
 * @package btp
 */

namespace BTP;

class Theme_Setup extends Loader {
    /**
     * Add hooks and filters here.
     * 
     * @return void
     */
    public function init() : void {
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_styles' ] );
        add_action( 'init', [ $this, 'register_theme_blocks' ] );
        add_action( 'init', [ $this, 'remove_core_patterns' ] );
    }

    /**
     * Enqueue the style.css file.
     * 
     * @return void
     */
    public function enqueue_styles() : void {
        wp_enqueue_style(
            'btp-style',
            get_stylesheet_uri(),
            [],
            wp_get_theme()->get( 'Version' )
        );
    }

    /**
     * Registers blocks that are included in the theme.
     * 
     * @return void
     */
    public function register_theme_blocks() : void {
        register_block_type( get_stylesheet_directory() . '/build/blocks/arrow-link/block.json' );
        register_block_type( get_stylesheet_directory() . '/build/blocks/navigation/block.json' );
        register_block_type( get_stylesheet_directory() . '/build/blocks/project-grid/block.json' );
        register_block_type( get_stylesheet_directory() . '/build/blocks/project-grid-item/block.json' );
    }

    /**
     * Removes core patterns.
     * 
     * @return void
     */
    public function remove_core_patterns() : void {
        remove_theme_support( 'core-block-patterns' );
    }
}