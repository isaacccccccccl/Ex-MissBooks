

export function BookPreview({ book }) {
    const {title, thumbnail, listPrice} = book 
    return (
        <article className="book-preview">
            <h2>title: {title}</h2>
            <img src={thumbnail} alt="" />
            <h3>price: {listPrice.amount}</h3>
        </article>
    )
}