import { useState } from "react"

export default Search = () => {
    
    const [query, setQuery] = useState('')

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase()
        setQuery(searchValue)

        const sorted = products.filter((item) => {
            return (
                item.product_name.toLowerCase().includes(searchValue) ||
                item.category_name.toLowerCase().includes(searchValue)
            )
        })
    }


    
    return (
        <div>
            <form className="search">
                <input 
                    type="text"
                    placeholder="Search by Product/Category"
                    value= {query}
                    onChange={handleSearch} 
                />
            </form>
        </div>
    )
}