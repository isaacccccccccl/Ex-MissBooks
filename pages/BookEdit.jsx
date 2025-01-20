import { bookService } from "../services/book.service.js"
const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => console.log('error:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        // value += ','
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))
    }

    function handleChangeListPrice({ target }) {
        let value = target.value
        // console.log('value', value)
        // value += ','
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prevBookToEdit => ({
            ...prevBookToEdit, listPrice: {
                ...prevBookToEdit.listPrice,
                amount: value,
            }
        }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(savedBook => {
                // console.log(savedBook)
                navigate('/book')
                showSuccessMsg('book Saved')
    })
    }


    const { title, listPrice } = bookToEdit
    return (
        <section className="book-edit">
            <h1>{bookId ? 'Book Edit' : 'Book Add'}</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input value={title} type="text" name="title" placeholder="book title" onChange={handleChange} />

                <label htmlFor="listPrice">Price</label>
                <input value={listPrice.amount || ''} type="number" name="listPrice" placeholder="book price" onChange={handleChangeListPrice} />

                <button>Save</button>
            </form>
        </section>
    )
}