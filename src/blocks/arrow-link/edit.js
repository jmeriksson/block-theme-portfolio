import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Edit({attributes}) {
	const { allowedBlocks } = attributes;
	const TEMPLATE = [
		[ 'core/paragraph', { placeholder: __('Insert a link here.', 'btp') } ],
	];
	return (
		<div { ...useBlockProps() }>
			<InnerBlocks allowedBlocks={allowedBlocks} template={TEMPLATE} templateLock="all" />
		</div>
	);
}
