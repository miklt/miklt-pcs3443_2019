import React from 'react'

const InstrutoresTable = props => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Aluno</th>
        <th>Instrutor</th>
        <th>Data</th>
        <th>Saída</th>
        <th>Chegada</th>
        <th>Parecer</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.aluno}</td>
            <th>{user.instrutor}</th>
            <td>{user.data}</td>
            <td>{user.horarioSaida}</td>
            <td>{user.horarioChegada}</td>
            <td>{user.parecer}</td>
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
          <td colSpan={3}>Sem voos</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default InstrutoresTable
