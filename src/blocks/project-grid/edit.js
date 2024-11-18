import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({attributes}) {
	const { allowedBlocks } = attributes;

	return (
		<>
			<div { ...useBlockProps() }>
				<InnerBlocks allowedBlocks={allowedBlocks} />
			</div>
		</>
	);
}
