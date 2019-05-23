import React from 'react'

const InstrutoresTable = props => (
  <table>
    <thead>
      <tr>
        <th>Num. Matricula</th>
        <th>Nome</th>
        <th>Email</th>
        <th>CPF</th>
        <th>Data de Nascimento</th>
        <th>Brevê</th>
        <th>Endereço</th>
        <th>Curso</th>
        <th>Instituição</th>
        <th>Data Diploma</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            <td>{user.numeroMatricula}</td>
            <td>{user.nome}</td>
            <th>{user.email}</th>
            <td>{user.cpf}</td>
            <td>{user.dataNascimento}</td>
            <td>{user.numeroBreve}</td>
            <td>{user.endereco}</td>
            <td>{user.nomeCurso}</td>
            <td>{user.intituicaoCurso}</td>
            <td>{user.dataDiploma}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(user)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteUser(user.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>Sem instrutores</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default InstrutoresTable
