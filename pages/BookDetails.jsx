import { BookPreview } from "../cmps/BookPreview.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const {useParams, Link} = ReactRouterDOM

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)
    const year = new Date()
    const params = useParams()
    console.log(params)

    const [priceColor, setPriceColor] = useState('')

    useEffect(() => {
        loadBooks()
    }, [params.bookId])

    function loadBooks() {
        bookService.get(params.bookId)
            .then(loadBook => {
                setBook(loadBook)
                determinePriceColor(loadBook.listPrice.amount)
            })
            .catch(err => { console.log('problem with loading images', err) })
    }

    function pageCount() {
        if (book.pageCount > 500) return 'Serious Reading'
        else if (book.pageCount > 200) return 'Descent Reading'
        else if (book.pageCount > 100) return 'Light Reading'
        else if (book.pageCount < 100) return 'Short Story'
    }

    function determinePriceColor(price) {
        if (price > 30) setPriceColor('red')
        else if (price < 20) setPriceColor('green')
        else setPriceColor('')

    }
    if (!book) return <div>loading...</div>
    
    const isOn = book.listPrice.isOnSale ? 'sale-sign' : ''
    const { title, thumbnail, listPrice } = book
    return (
        <section className="book-details">
            <div className={`image-container`}>
                {isOn && <div  className={isOn}>On Sale</div>}
                <img src={thumbnail} alt=""/>
            </div>
            <div className="book-detail-container">
                <h2>title: {title}</h2>
                <h3>price: {listPrice.amount}</h3>
                <h3>{pageCount()}</h3>
                <h3>{(year.getFullYear() - book.publishedDate > 10) ? 'Vintage' : 'New'}</h3>
                <LongTxt txt={book.description} />
                <button>
                    <Link to={`/book`}>Back</Link>
                </button>

            </div>
        </section>
    )
}