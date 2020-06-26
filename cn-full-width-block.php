<?php
/*
Plugin Name: CN Full Width Block
Description: Full width Gutenberg block that accepts arbitrary HTML code
Author: Radley Sustaire
Author URI: https://radleysustaire.com/
*/

define( 'CNFW_URL', untrailingslashit(plugin_dir_url( __FILE__ )) );
define( 'CNFW_PATH', dirname(__FILE__) );
define( 'CNFW_VERSION', '1.0.1' );

function cnfw_register_block() {
	// Admin
	wp_register_script(
		'cn-full-width-block-admin',
		CNFW_URL . '/admin/cn-full-width-admin.js',
		array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ),
		filemtime( CNFW_PATH . '/admin/cn-full-width-admin.js' )
	);
	
	wp_register_style(
		'cn-full-width-block-admin',
		CNFW_URL . '/admin/cn-full-width-admin.css',
		array(),
		filemtime( CNFW_PATH . '/admin/cn-full-width-admin.css' )
	);
	
	// Public
	wp_register_script(
		'cn-full-width-block',
		CNFW_URL . '/public/cn-full-width-public.js',
		array( 'jquery' ),
		filemtime( CNFW_PATH . '/public/cn-full-width-public.js' )
	);
	
	wp_register_style(
		'cn-full-width-block',
		CNFW_URL . '/public/cn-full-width-public.css',
		array(),
		filemtime( CNFW_PATH . '/public/cn-full-width-public.css' )
	);
	
	// Block
	register_block_type(
		'cn/full-width-block',
		array(
			'editor_script' => 'cn-full-width-block-admin',
			'editor_style' => 'cn-full-width-block-admin',
			'script' => 'cn-full-width-block',
			'style' => 'cn-full-width-block',
		)
	);
	
}
add_action( 'init', 'cnfw_register_block' );