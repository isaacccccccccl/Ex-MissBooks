

export function BookPreview({ book, priceColor, onSale }) {
    const { title, thumbnail, listPrice } = book
    console.log(onSale)

    return (
        <article className="book-preview">
            <h2>title: {title}</h2>
            <div className="image-container">
                <img src={thumbnail} alt="" />
                {onSale && <div className="sale-sign">Sale</div>}
            </div>
            <h3 className={priceColor}>price: {listPrice.amount}</h3>
        </article>
    )
}