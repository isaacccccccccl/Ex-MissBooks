import { BookPreview } from "./BookPreview.jsx"

const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
    return (
        <section >
            <ul className="book-list">
                {books.map(book =>
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <section>
                            <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                            <Link to={`/book/${book.id}`}><button>Details</button></Link>
                            {/* <Link>Edit</Link> */}
                        </section>
                    </li>
                )}
            </ul>
        </section>
    )
}