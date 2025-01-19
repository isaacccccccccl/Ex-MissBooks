import { BookPreview } from "../cmps/BookPreview.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)
    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => { console.log('problem with loading images', err) })
    }

    if (!book) return <div>loading...</div>
    return (
        <section className="book-details">
            <BookPreview book={book} />
            <button onClick={onBack}>back</button>
        </section>
    )
}