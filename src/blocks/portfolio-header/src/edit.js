import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'
import './editor.scss'
import apiFetch from '@wordpress/api-fetch'
import { useEffect, useState } from '@wordpress/element'

export default function Edit() {
	const [siteInfo, setSiteInfo] = useState({
		title: '',
		description: '',
		homeUrl: ''
	})

	useEffect(() => {
		apiFetch({ path: '/wp/v2/settings' })
			.then(data => {
				setSiteInfo({
					title: data.title,
					description: data.description,
					homeUrl: data.url
				})
			})
	}, [])

	return (
		<div { ...useBlockProps() }>
			<header className="btp-header" role="banner">
				<a href={siteInfo.homeUrl}>
					<span className="btp-header__title">{siteInfo.title}</span>
					<span className="btp-header__separator">/</span>
					<span className="btp-header__site-description">{siteInfo.description}</span>
				</a>
				<button id="js-offcanvas-toggler" className="btp-header__offcanvas-toggler" aria-controls="js-offcanvas" aria-expanded="false">
					<span className="hamburger-menu-bar"></span>
					<span className="hamburger-menu-bar"></span>
					<span className="hamburger-menu-bar"></span>
				</button>
			</header>
		</div>
	)
}
