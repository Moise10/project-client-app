import React, { useState } from 'react';
import {  FaList } from 'react-icons/fa';
import { useMutation , useQuery} from '@apollo/client';
import { ADD_PROJECT } from '../mutations/ProjectMutation';
import { GET_CLIENTS } from '../queries/ClientQueries';
import { GET_PROJECT } from '../queries/ProjectQueries';




export default function AddProjectModal() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new')

  //Get Clients for select 

  const {loading, error, data} = useQuery(GET_CLIENTS)


	const [addProject] = useMutation(ADD_PROJECT, {
		variables: { name, status, description, clientId },
		update(cache, { data: { addProject } }) {
			const { projects } = cache.readQuery({ query: GET_PROJECT });
			cache.writeQuery({
				query: GET_PROJECT,
				data: { projects: [...projects, addProject] },
			});
		},
	});

	const onSubmit = (e) => {
		e.preventDefault();

		if (name === '' || description === '' || status === '') {
			return alert('Please fill in all fields');
		}

		addProject(name, description, clientId, status);

		setName('');
		setDescription('');
		setStatus('new');
    setClientId('')
	};

  if(loading) return null
  if(error) return <p>Something went wrong!!!</p>

	return (
		<>
			{!loading && !error && (
				<>
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#addProjectModal"
					>
						<div className="d-flex align-items-center">
							<FaList className="icon" />
							<div className="">New Project</div>
						</div>
					</button>
					<div
						className="modal fade"
						id="addProjectModal"
						aria-labelledby="addProjectModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="addProjectModalLabel">
										New Project
									</h5>
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"
									></button>
								</div>
								<div className="modal-body">
									<form onSubmit={onSubmit}>
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
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">Client</label>
                      <select name="" id="clientId" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                        <option value="">Select Client</option>
                        {data.clients.map(client => (
                          <option value={client.id} key={client.id}>{client.name}</option>
                        ))}
                      </select>
                    </div>
										<button
											type="submit"
											data-bs-dismiss="modal"
											className="btn btn-primary"
										>
											Submit
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
