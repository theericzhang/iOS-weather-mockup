import { React, useState } from "react"

export default function CitiesOverviewForm({ focusHandler, 
                                             blurHandler,
                                             isFocusedOnInput }) 
{
    const [searchQuery, setSearchQuery] = useState('')
    console.log(searchQuery)

    return (
        <form action="" className="city-query">
            <input type="text" 
                    className="cities-search-bar"
                    onFocus={focusHandler}
                    onBlur={blurHandler} 
                    placeholder="Search for a city" 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
            />
            <button className="search-button" 
                    disabled={isFocusedOnInput? false: true}
                    type="submit">
                        Search
            </button>
        </form>
    )
}