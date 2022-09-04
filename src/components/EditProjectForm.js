import React , {useState} from 'react'
import {UPDATE_PROJECT} from '../mutations/ProjectMutation'
import {useMutation} from '@apollo/client'
import {GET_PROJECT} from '../queries/ProjectQueries'


function EditProjectForm({project}) {

  const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description);
	const [status, setStatus] = useState('new');


  const [updateProject] = useMutation(UPDATE_PROJECT, {
		variables: { id:project.id , name, status, description },
		refetchQueries: [{ query: GET_PROJECT, variables: { id:project.id}}]
	});


  const onSubmit = (e) => {
		e.preventDefault();

		if (!name || !description  || !status ) {
			return alert('Please fill in all fields');
		}

		updateProject(name, description, status);
	};

  return (
		<div className="mt-5">
			<h3>Update Project Details</h3>
			<form action="" onSubmit={onSubmit}>
				<div className="mb-3">
					<label htmlFor="" className="form-label">
						Name
					</label>
					<input
						type="text"
						id="name"
						className="form-control"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<label htmlFor="" className="form-label">
						Description
					</label>
					<textarea
						type="text"
						id="description"
						className="form-control"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
					<label htmlFor="" className="form-label">
						Status
					</label>
					<select
						className="form-select"
						id="status"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value="new">Not Started</option>
						<option value="progress">In Progress</option>
						<option value="completed">Completed</option>
					</select>
				</div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
			</form>
		</div>
	);
}

export default EditProjectForm