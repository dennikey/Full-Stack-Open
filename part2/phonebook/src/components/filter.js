import React from 'react'

const Filter = ({handleSearch, totalSearches}) => {
    return (
        <div>
            filter shown with <input onChange={handleSearch} />
            {totalSearches.map(search => <p>{search.name} {search.number}</p>)}
        </div>
    )
}

export default Filter