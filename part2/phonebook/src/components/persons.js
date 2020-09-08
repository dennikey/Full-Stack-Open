import React from 'react'

const Person = ({key, name, number}) => {
    return (
      <p key={key}>{name} {number}</p>
    )
}

const Persons = ({persons}) => {
    return (
        <div>
            {persons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
        </div>
    )
}

export default Persons