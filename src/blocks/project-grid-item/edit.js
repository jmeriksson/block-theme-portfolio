import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import ProjectCard from './components/ProjectCard';

export default function Edit({attributes, setAttributes}) {
	const { selectedProject } = attributes;
	const [ availableProjects, setAvailableProjects ] = useState([]);

	// Handle project selection and sets selected project as block attribute.
	const handleProjectSelection = projectId => {
		if (!fetchedProjects) {
			console.error("No projects found");
		}
		const projectToSet = fetchedProjects.find(project => project.id == projectId);
		setAttributes({ selectedProject: {
			label: projectToSet.title.raw,
			value: projectToSet.id,
			url: projectToSet.link,
			excerpt: projectToSet.excerpt.raw,
			featuredImageId: projectToSet.featured_media,
		}});
	}
	
	// Fetch all projects
	const fetchedProjects = useSelect(select => {
		return select('core').getEntityRecords('postType', 'project', { per_page: 99 });
	}, []);

	const featuredImage = useSelect(select => {
		if (!selectedProject || !selectedProject.featuredImageId) {
			return null;
		}
		return select('core').getMedia(selectedProject.featuredImageId);
	}, [selectedProject]);

	// Set available projects when fetchedProjects is available
	useEffect(() => {
		if (fetchedProjects) {
			setAvailableProjects(fetchedProjects.map(project => ({
				label: project.title.rendered,
				value: project.id
			})))
		}
	}, fetchedProjects);

	useEffect(() => {
		if (featuredImage) {
			setAttributes({ featuredImage: {
				source_url: featuredImage.source_url,
				alt_text: featuredImage.alt_text
			}});
		}
	}, [featuredImage]);

	// Set the first project as selected when availableProjects is available
	useEffect(() => {
		if (availableProjects && availableProjects.length > 0) {
			handleProjectSelection(availableProjects[0].value);
		}
	}, [availableProjects]);

	if (!availableProjects) {
		return <></>
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __('Project Grid Item', 'btp') }>
					<SelectControl
						label={__('Select a project', 'btp')}
						value={ selectedProject?.value ? selectedProject.value : availableProjects[0]?.value }
						options={ availableProjects }
						defaultValue={__('Select a project', 'btp')}
						onChange={ newValue => handleProjectSelection(newValue) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<article { ...useBlockProps() }>
				{selectedProject ? <ProjectCard project={ selectedProject } featuredImage={ featuredImage } />: null}
			</article>
		</>
	);
}
