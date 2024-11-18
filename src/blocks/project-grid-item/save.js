import { useBlockProps } from '@wordpress/block-editor';
import ProjectCard from './components/ProjectCard';

export default function save({ attributes }) {
	const { selectedProject, featuredImage } = attributes;
	return (
		<article { ...useBlockProps.save() }>
			{selectedProject ? <ProjectCard project={selectedProject} featuredImage={featuredImage} /> : null}
		</article>
	);
}
