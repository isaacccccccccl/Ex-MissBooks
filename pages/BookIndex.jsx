
import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

const {useState, useEffect} = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect( () => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({...prevFilter, ...newFilter}))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg('Book has been successfully removed!')
            })
            .catch(() => showErrorMsg(`couldn't remove book`)) 
    }

    if (!books) return <div>Loading.....</div>
    return (
        <section className="Book-index">
            <BookFilter filterBy={filterBy} onFilterBy={onSetFilterBy}/>
            <BookList books={books} onRemoveBook={onRemoveBook}/>
        </section>
    )
}