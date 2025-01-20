import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSubmit(ev) {
        ev.preventDefault()
        console.log('Submit filter')
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            default:
                break;
        }
        setFilterByToEdit(filterBy => ({ ...filterBy, [field]: value }))
    }

    const { txt, minPrice } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmit} className="filter-form">
                <section>

                    <label htmlFor="txt">title</label>
                    <input id="txt" name="txt" onChange={handleChange} value={txt} type="text" />
                </section>
                
                <section>

                    <label htmlFor="minPrice">Min Price</label>
                    <input id="minPrice" name="minPrice" onChange={handleChange} value={minPrice || ''} type="number" />
                </section>

                <button>Submit</button>
            </form>
        </section>
    )
}