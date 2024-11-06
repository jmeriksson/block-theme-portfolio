import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { HamburgerIcon } from './components/HamburgerIcon';
import { CloseIcon } from './components/CloseIcon';

export default function save({ attributes }) {
	const { homeUrl, siteTitle } = attributes;
	const openOffcanvasText = __( 'Open mobile menu', 'btp' );
	const closeOffcanvasText = __( 'Close mobile menu', 'btp' );
	return (
		<div { ...useBlockProps.save() }>
			<nav className="btp-navigation" id="js-btp-navigation">
				<a className="btp-navigation__site-title" href={ homeUrl }>{ siteTitle }</a>
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
					<InnerBlocks.Content />
				</div>
			</nav>
		</div>
	);
}
