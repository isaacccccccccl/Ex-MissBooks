
export function BookPreview({ book }) {
    return <article className="book-preview">
            <h3>{book.title}</h3>
            <img src={book.thumbnail} alt="" />
            <p>{book.listPrice.amount} {book.listPrice.currencyCode}</p>
        </article>
}