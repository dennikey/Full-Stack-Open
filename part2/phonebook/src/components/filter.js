import React from 'react'

const Filter = ({handleSearch, persons, newSearch}) => {
    const found = persons.find(x => x.name === newSearch)

    return (
        <div>
            filter shown with <input onChange={handleSearch} />
            {found ? 
            <p>{found.name} {found.number}</p>
            : null}
        </div>
    )
}

/* 
{newSearch === "" ? 
                persons.filter(person => person.name.toLowerCase() === newSearch.toLowerCase()).reduce((acc, person) => acc.concat(person), [])
                    .map(search => <p>{search.name} {search.number}</p>)
*/

export default Filter