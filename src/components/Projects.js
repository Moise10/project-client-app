import {useQuery} from '@apollo/client'
import {GET_PROJECTS} from '../queries/ProjectQueries'
import ProjectCard from '../components/ProjectCard'


function Projects() {
  const {loading, error , data} = useQuery(GET_PROJECTS)
  if(loading) return null
  if(error) return <p>Something went wrong</p>

  return (
		<>
			{data.projects.length > 0 ? (
				<div className="row mt-4">
					{data.projects.map((project) => {
						return <ProjectCard key={project.id} project={project} />;
					})}
				</div>
			) : (
				<p>No Projects</p>
			)}
		</>
	);
}

export default Projects