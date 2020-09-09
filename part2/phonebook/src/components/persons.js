import React from 'react'

const Person = ({id, key, name, number, handleDelete}) => {
    return (
        <div>
            <p key={key}>{name} {number}</p>
            <button onClick={() => handleDelete(id)}>delete</button>
        </div>
    )
}

const Persons = ({persons, handleDelete}) => {
    return (
        <div>
            {persons.map(person => <Person id={person.id} key={person.name} name={person.name} number={person.number} handleDelete={handleDelete} />)}
        </div>
    )
}

export default Persons