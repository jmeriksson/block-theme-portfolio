import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { HamburgerIcon } from './components/HamburgerIcon';
import { CloseIcon } from './components/CloseIcon';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { allowedBlocks } = attributes;
	const TEMPLATE = [
		[ 'core/page-list' ]
	];
	const site = useSelect((select) => select('core').getSite(), []);
	const openOffcanvasText = __( 'Open mobile menu', 'btp' );
	const closeOffcanvasText = __( 'Close mobile menu', 'btp' );

	useEffect(() => {
		setAttributes({ homeUrl: site.url ?? "" });
		setAttributes({ siteTitle: site.title ?? "" });
	}, site)
	return (
		<div { ...useBlockProps() }>
			<nav className="btp-navigation" id="js-btp-navigation">
				<a className="btp-navigation__site-title" href={ attributes.homeUrl }>{ attributes.siteTitle }</a>
				<button
					id="js-btp-navigation__offcanvas-toggle"
					className="btp-navigation__offcanvas-toggle"
					aria-expanded="false"
					aria-controls="js-btp-navigation__menu"
					aria-label={openOffcanvasText}
					data-open-text={openOffcanvasText}
					data-close-text={closeOffcanvasText}
				>
					<CloseIcon className="close-icon" />
					<HamburgerIcon className="hamburger-icon" />
				</button>
				<div className="btp-navigation__menu" id="js-btp-navigation__menu">
					<InnerBlocks allowedBlocks={allowedBlocks} template={TEMPLATE} />
				</div>
			</nav>
		</div>
	);
}
