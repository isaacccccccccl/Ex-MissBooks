import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookDetails } from "../pages/BookDetails.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => { console.log('problem with loading images', err) })
    }

    function onRemoveBooks(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => console.log('problem removing book', err))
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(filterBy => ({ ...filterBy, ...filterByToEdit }))
    }

    if (!books) return <div>loading...</div>
    const { txt, minPrice } = filterBy
    return (
        <section className="book-list">
            {
                <React.Fragment>
                    <BookFilter filterBy={{ txt, minPrice }} onSetFilter={onSetFilter} />
                    <BookList
                        BookList books={books}
                        onRemoveBook={onRemoveBooks} />
                </React.Fragment>
            }
        </section>
    )
}