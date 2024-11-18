import { __ } from '@wordpress/i18n';

export default function ProjectCard({project, featuredImage}) {
    const {label, excerpt, url} = project;
    return (
        <>
            {featuredImage ? (
                <img className="project-card__image" src={ featuredImage.source_url } alt={ featuredImage.alt_text } />
            ) : null}
            <div className="project-card__text-content">
                {label ? (
                    <h3 className="project-card__heading">{ label }</h3>
                ) : null}
                {excerpt ? (
                    <p className="project-card__excerpt">{ excerpt }</p>
                ) : null}
            </div>
            {url ? (
                <a href={ url }>{ __('View project', 'btp') }</a>
            ): null}
        </>
    )
}