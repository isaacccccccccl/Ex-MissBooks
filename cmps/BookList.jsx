
import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook, onSetSelectedId }) {


    return (
        <ul className="cards">
            {books.map(book => {
                return (
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <section>
                            <button onClick={() => onRemoveBook(book.id)}>remove</button>
                            <button>
                                <Link to={`/book/${book.id}`}>Select</Link>
                            </button>
                        </section>
                    </li>
                )
            })}
        </ul>
    )
}