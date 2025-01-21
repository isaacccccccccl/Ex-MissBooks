import { utilService } from "../services/util.service.js"
const { useState, useEffect, useRef } = React

export function BookFilter({ filterBy, onFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect( () => {
        onFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onSubmit(ev) {
        ev.preventDefault()
        onFilterBy(filterByToEdit)
    }

    function handleChange({ target }) {
        console.log(target.value)
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
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    

    return (
        <section className="book-filter">
            <h1>Filter</h1>
            <form className="filter-form" onSubmit={onSubmit}>
                <section>
                    <label htmlFor="txt">title</label>
                    <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} />
                </section>

                <section>
                    <label htmlFor="price">minPrice</label>
                    <input type="number" name="minPrice" id="price" value={filterByToEdit.minPrice} onChange={handleChange}/>
                </section>

                <button>Submit</button>
            </form>

        </section>
    )
}