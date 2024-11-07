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
        add_action( 'save_post', [ $this, 'save_meta_boxes' ] );
    }

    /**
     * Register the post type.
     */
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
                'delete_with_user' => false,
                'register_meta_box_cb' => [ $this, 'register_meta_boxes' ],
                'template' => [
                    [
                        'core/pattern',
                        [
                            'slug' => 'btp/project-header'
                        ]
                    ]
                ]
            ]
        );
    }

    /**
     * Callback function for registering meta boxes to the post type.
     */
    public function register_meta_boxes() : void {
        add_meta_box(
            'project_meta_box',
            esc_html__('Project Heading', 'btp'),
            [ $this, 'render_project_heading_meta_box' ],
            $this->slug,
            'side',
            'high'
        );
    }

    /**
     * Callback function for rendering the project heading meta box.
     */
    public function render_project_heading_meta_box() : void {
        $project_heading = get_post_meta( get_the_ID(), 'project_heading', true );
        ?>
        <fieldset>
            <?php wp_nonce_field( 'save_project_heading_meta_box', 'project_heading_meta_box_nonce' ); ?>
            <label for="project_heading"><?php esc_html_e('Heading', 'btp'); ?></label>
            <input type="text" name="project_heading" id="project_heading" class="widefat" value="<?php esc_attr_e( $project_heading ); ?>" aria-describedby="project_heading_description">
            <small id="project_heading_description"><?php esc_html_e("This is rendered as an h1 heading at the top of the project page."); ?></small>
        </fieldset>
        <?php
    }

    /**
     * Save meta boxes for the post type.
     */
    public function save_meta_boxes( $post_id ) {
        if ( ! isset( $_POST['project_heading_meta_box_nonce'])) {
            return $post_id;
        }

        $nonce = $_POST['project_heading_meta_box_nonce'];

        if ( ! wp_verify_nonce( $nonce, 'save_project_heading_meta_box' ) ) {
            return $post_id;
        }

        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return $post_id;
        }

        if ( 'page' == $_POST['post_type'] ) {
            if ( ! current_user_can( 'edit_page', $post_id ) ) {
                return $post_id;
            }
        } else {
            if ( ! current_user_can( 'edit_post', $post_id ) ) {
                return $post_id;
            }
        }

        $new_meta_value = ( isset( $_POST['project_heading'] ) ? sanitize_text_field( $_POST['project_heading'] ) : '' );

        update_post_meta( $post_id, 'project_heading', $new_meta_value );
    }
}