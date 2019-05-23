import React, { useState } from 'react'

const AddUserForm = props => {
	const initialFormState = { id: null, name: '', username: '' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		// setUser({ ...user, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!user.name || !user.username) return

				props.addUser(user)
				setUser(initialFormState)
			}}
		>
			<label>Nome</label>
			<input type="text" name="nome" value={user.name} onChange={handleInputChange} />
			<label>Data de Nascimento</label>
			<input type="text" name="dataNascimento" value={user.dataNascimento} onChange={handleInputChange} />
			<label>CPF</label>
			<input type="text" name="cpf" value={user.cpf} onChange={handleInputChange} />
			<label>Email</label>
			<input type="text" name="email" value={user.email} onChange={handleInputChange} />
			<label>Endereço</label>
			<input type="text" name="endereco" value={user.endereco} onChange={handleInputChange} />
			<button>Add new user</button>
		</form>
	)
}

export default AddUserForm
