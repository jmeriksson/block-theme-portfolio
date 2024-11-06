<?php
/**
 * Project post type.
 * 
 * @package btp
 */

namespace BTP;

class Project_Post_Type extends Loader {
    /**
     * The post type slug.
     * 
     * @var string
     */
    public string $slug = 'project';

    /**
     * Add hooks and filters here.
     * 
     * @return void
     */
    public function init() : void {
        add_action( 'init', [ $this, 'register_post_type' ] );
    }

    public function register_post_type() : void {
        register_post_type(
            $this->slug,
            [
                'labels' => [
                    'name' => esc_html__('Projects', 'btp'),
                    'singular_name' => esc_html__('Project', 'btp'),
                    'add_new' => esc_html__('Add New Project', 'btp'),
                    'add_new_item' => esc_html__('Add New Project', 'btp'),
                    'edit_item' => esc_html__('Edit Project', 'btp'),
                    'new_item' => esc_html__('New Project', 'btp'),
                    'view_item' => esc_html__('View Project', 'btp'),
                    'view_items' => esc_html__('View Projects', 'btp'),
                    'search_items' => esc_html__('Search Projects', 'btp'),
                    'not_found' => esc_html__('No Projects found', 'btp'),
                    'not_found_in_trash' => esc_html__('No Projects found in Trash', 'btp'),
                    'all_items' => esc_html__('All Projects', 'btp'),
                    'archives' => esc_html__('Project Archives', 'btp'),
                    'attributes' => esc_html__('Project Attributes', 'btp'),
                    'insert_into_item' => esc_html__('Insert into Project', 'btp'),
                    'uploaded_to_this_item' => esc_html__('Uploaded to this Project', 'btp'),
                    'filter_items_list' => esc_html__('Filter Projects list', 'btp')
                ],
                'public' => true,
                'show_in_rest' => true,
                'menu_position' => 3,
                'menu_icon' => 'dashicons-feedback',
                'supports' => [ 'title', 'editor', 'thumbnail', 'excerpt' ],
                'has_archive' => true,
                'rewrite' => [ 'slug' => 'projects' ],
                'delete_with_user' => false
            ]
        );
    }
}