import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(setBooks)
            .catch(err => { console.log('problem with loading images', err) })
    }

    console.log(books)
    if (!books) return <div>loading...</div>
    return (
        <section className="book-list">
            <h1>book index</h1>
            <BookList books={books}/>
        </section>
    )
}