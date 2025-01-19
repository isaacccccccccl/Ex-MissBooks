


export function BookList({books}) {


    return (
        <ul className="cards">
                {books.map(book => {
                    return (
                        <li key={book.id}>
                            <h2 key={book.id}>title: {book.title}</h2>
                            <img src={book.thumbnail} alt="" />
                            <h3>price: {book.listPrice.amount}</h3>
                        </li>
                    )
                })}
            </ul>
    )
}