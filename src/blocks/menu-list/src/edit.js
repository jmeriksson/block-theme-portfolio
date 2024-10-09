import { __ } from '@wordpress/i18n'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import { SelectControl, PanelBody } from '@wordpress/components'
import { useEffect, useState } from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch'

export default function Edit({ attributes, setAttributes }) {
	const { selectedMenu } = attributes
	const [menus, setMenus] = useState([])
	const [loading, setLoading] = useState(true)
	const [menuItems, setMenuItems] = useState([])
	useEffect(() => {
		apiFetch({ path: '/wp/v2/menus' })
			.then(data => {
				setMenus(data)
				setLoading(false)
			})
			.catch(error => {
				console.error('Error fetching menus:', error)
				setLoading(false)
			})
	}, [])

	useEffect(() => {
		if (!menus || !menus[0]?.id) {
			return
		}
		apiFetch({ path: `/wp/v2/menu-items?menus=${menus[0]?.id}` })
			.then(data => {
				setMenuItems(data)
			})
			.catch(error => {
				console.error('Error fetching menu items:', error)
			})
	}, [menus])

	useEffect(() => {
		if (!selectedMenu || !selectedMenu?.id) {
			return
		}
		apiFetch({ path: `/wp/v2/menu-items?menus=${selectedMenu?.id}` })
			.then(data => {
				setMenuItems(data)
			})
			.catch(error => {
				console.error('Error fetching menu items:', error)
			})
	}, [selectedMenu?.id])

	
	return (
		<>
			<InspectorControls>
				<PanelBody title="Select menu">
					{loading ? (
						<p>{ __('Loading menus...') }</p>
					) : (
						<SelectControl
							label="Menus"
							value={selectedMenu}
							options={menus.map((menu) => ({
								label: menu.name,
								value: menu.slug,
								id: menu.id
							}))}
							onChange={(newMenu) =>
								setAttributes({ selectedMenu: newMenu })
							}
						/>
					)}

				</PanelBody>
			</InspectorControls>
			<ul {...useBlockProps()}>
				{Array.isArray(menuItems) && menuItems.map(menuItem => (
					<li>
						{menuItem.title.rendered}
					</li>
				))}
			</ul>
		</>
	)
}
