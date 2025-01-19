
import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemoveBook, onSetSelectedId }) {


    return (
        <ul className="cards">
            {books.map(book => {
                return (
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <section>
                            <button onClick={() => onRemoveBook(book.id)}>remove</button>
                            <button onClick={() => onSetSelectedId(book.id)}>select</button>
                        </section>
                    </li>
                )
            })}
        </ul>
    )
}