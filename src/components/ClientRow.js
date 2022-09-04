import React from 'react'
import {FaTrash}  from 'react-icons/fa'
import {useMutation} from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/ClientMutations';
import { GET_CLIENTS } from '../queries/ClientQueries'
import { GET_PROJECTS } from '../queries/ProjectQueries'



function ClientRow({client}) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: { id: client.id },

		//refetching the queries/all clients after deleting them


		refetchQueries: [{ query: GET_CLIENTS}, { query: GET_PROJECTS}],

		//best way to refetch is to update the cache

  // update(cache, { data: { deleteClient } }) {
  //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
  //   cache.writeQuery({
  //     query: GET_CLIENTS,
  //     data: {
  //       clients: clients.filter((client) => client.id !== deleteClient.id),
  //     },
  //   });
  // },
	});

  return (
		<tr>
			<td className="fs-6">{client.name}</td>
			<td className="fs-6">{client.email}</td>
			<td className="fs-6">{client.phone}</td>
			<td>
				<button
					className="btn btn-danger btn-sm"
					onClick={deleteClient}
				>
					<FaTrash className="fw-5"/>
				</button>
			</td>
		</tr>
	);
}

export default ClientRow