wp.blocks.registerBlockType( "cn/full-width-block", {
	title: "CN Full Width Block",
	description: "Add a single video to this element, it will be made full width. Use block styles to adjust the aspect ratio.",
	icon: 'image-flip-horizontal',
	category: "common",

	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'div',
		},
		className: 'donkey',
		class: 'donkey',
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/html' ],
				transform: function ( attributes ) {
					return wp.blocks.createBlock( 'cn/full-width-block', {
						content: attributes.content,
					} );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/html' ],
				transform: function ( attributes ) {
					return wp.blocks.createBlock( 'core/html', {
						content: attributes.content,
					} );
				},
			},
		],
	},

	edit: function(props) {
		return wp.element.createElement(
			wp.editor.PlainText,
			{
				tagName: 'div',
				className: "cn-full-width wp-block-code block-editor-plain-text",
				value: props.attributes.content,
				onChange: function( newContent ) {
					props.setAttributes( { content: newContent } );
				}
			}
		);
	},
	save: function(props) {
		return wp.element.createElement(
			wp.editor.RichText.Content,
			{
				tagName: 'div',
				className: "cn-full-width",
				value: props.attributes.content,
			}
		);
	},
} );

wp.blocks.registerBlockStyle(
	'cn/full-width-block',
	[
		{
			name: 'landscape-16-9',
			label: 'Landscape (16:9)',
			isDefault: true,
		},
		{
			name: 'landscape-4-3',
			label: 'Landscape (4:3)',
		},
		{
			name: 'landscape-19-9',
			label: 'Landscape (19:9)',
		},
		{
			name: 'portrait-16-9',
			label: 'Portrait (16:9)',
		},
		{
			name: 'portrait-4-3',
			label: 'Portrait (4:3)',
		},
		{
			name: 'portrait-19-9',
			label: 'Portrait (19:9)',
		},
		{
			name: 'square',
			label: 'Square',
		}
	]
);