import { React, useState } from "react"

export default function CitiesOverviewForm({ focusHandler, 
                                             blurHandler,
                                             isFocusedOnInput }) 
{
    const [searchQuery, setSearchQuery] = useState('')
    console.log(searchQuery)

    function handleSearchQuerySubmit(e) {
        e?.preventDefault()
        console.log(`You typed ${searchQuery}`)
    }

    return (
        <form action="" className="city-query" onSubmit={(e) => handleSearchQuerySubmit(e)}>
            <input type="text" 
                    className="cities-search-bar"
                    onFocus={focusHandler}
                    onBlur={blurHandler} 
                    placeholder="Search for a city" 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
            />
            <button className="search-button" 
                    disabled={(isFocusedOnInput || searchQuery !== '')? false: true}
                    type="submit"
                    id={searchQuery === '' ? "greyed-out-button" : "active-button"}
                    onClick={(e) => handleSearchQuerySubmit(e)}>
                        Search
            </button>
        </form>
    )
}