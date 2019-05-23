import React, { useState, Fragment } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'
import InstrutoresTable from './tables/InstrutoresTable'
import VoosTable from './tables/VoosTable'
import axios from 'axios'

const App = () => {

	// Data
	let usersData = [
		{ id: 1, name: 'Tania', username: 'floppydiskette' },
		{ id: 2, name: 'Craig', username: 'siliconeidolon' },
		{ id: 3, name: 'Ben', username: 'benisphere' },
	]

	const initialFormState = { id: null, name: '', username: '' }

	// Setting state
	let [ users, setUsers ] = useState(usersData)
	let [ instrutores, setInstrutores ] = useState(usersData)
	let [ voos, setVoos ] = useState(usersData)
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	

	const addUser = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])
	}

	const deleteUser = id => {
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, name: user.name, username: user.username })
	}

	setTimeout( () => {
		axios.get('https://aeroclub-backend.herokuapp.com/api/Alunos')
		.then(result => {
			users = result.data.data;
			console.log("Alunos",users);
			setUsers(users);
			
		});
		
		axios.get('https://aeroclub-backend.herokuapp.com/api/Instrutores')
		.then(result => {
			instrutores = result.data.data;
			console.log("Instrutores",instrutores);
			setInstrutores(instrutores);
			
		});

		axios.get('https://aeroclub-backend.herokuapp.com/api/Voos')
		.then(result => {
			voos = result.data.data;
			console.log("Voos",voos);
			setVoos(voos);		
		});

	}, 1000);

	


	return (
		<div className="container">
			<h1>Alunos</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Editar aluno</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Novo aluno</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>Ver alunos</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		
			
			<h1>Instrutores</h1>
			<div className="flex-row">
			<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Editar instrutor</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Novo instrutor</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>Ver instrutor</h2>
					<InstrutoresTable users={instrutores} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		
			
			<h1>Voos</h1>
			<div className="flex-row">
			<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Editar voo</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Novo voo</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>Ver Voos</h2>
					<VoosTable users={voos} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		
		
		</div>
	)
}

export default App
