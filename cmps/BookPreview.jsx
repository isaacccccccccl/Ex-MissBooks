

export function BookPreview({ book }) {
    const { title, thumbnail, listPrice } = book

    return (
        <article className="book-preview">
            <h2>title: {title}</h2>
            <div className="image-container">
                <img src={thumbnail} alt="" />
            </div>
            <h3>price: {listPrice.amount}</h3>
        </article>
    )
}