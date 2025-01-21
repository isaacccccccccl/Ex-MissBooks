import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

const {useState, useEffect} = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const year = new Date()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
    }

    function pageCount() {
        if (book.pageCount > 500) return 'Serious Reading'
        else if (book.pageCount > 200) return 'Descent Reading'
        else if (book.pageCount > 100) return 'Light Reading'
        else if (book.pageCount < 100) return 'Short Story'
    }

    function determinePriceColor() {
        if (book.listPrice.amount > 150) return 'red'
        else if (book.listPrice.amount < 20) return 'green'
        else return ''
    }

    if (!book) return <div>loadng...</div>
    const isOn = book.listPrice.isOnSale ? 'sale-sign' : ''
    const {title, id, thumbnail, description, authors, listPrice, publishedDate} = book
    return (
        <section>
        <section className="book-details">
        <div className={`image-container`}>
                    {isOn && <div className={isOn}>On Sale</div>}
                    <img src={thumbnail} alt="" />
                </div>
            <section className="details-info">
                <h1>{title}</h1>
                <h1>price: <span className={determinePriceColor()}>{listPrice.amount} {listPrice.currencyCode}</span></h1>
                <h1>  {pageCount()}</h1>
                <h1>author: {authors}</h1>
                <h1>published Year: {publishedDate}, {(year.getFullYear() - book.publishedDate > 10) ? 'Vintage' : 'New'}</h1>
                <LongTxt txt={book.description} />
            </section>
        </section>
            <Link to={`/book`}><button>Back</button></Link>

        </section>
    )    
}