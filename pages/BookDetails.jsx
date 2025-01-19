import { BookPreview } from "../cmps/BookPreview.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)
    const year = new Date()
    let pageCountTxt
    const [priceColor, setPriceColor] = useState('')

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.get(bookId)
            .then(loadBook => {
                setBook(loadBook)
                determinePriceColor(loadBook.listPrice.amount)
            })
            .catch(err => { console.log('problem with loading images', err) })
    }

    function pageCount() {
        if (book.pageCount > 500) pageCountTxt = 'Serious Reading'
        else if (book.pageCount > 200) pageCountTxt = 'Descent Reading'
        else if (book.pageCount > 100) pageCountTxt = 'Light Reading'
        else if (book.pageCount < 100) pageCountTxt = 'Short Story'
    }

    function determinePriceColor(price) {
        console.log(typeof(price))
        if (price > 30) setPriceColor('red')
        else if (price < 20) setPriceColor('green')
        else setPriceColor('')
        
    }
    if (!book) return <div>loading...</div>
    pageCount()
    // console.log(book)
    return (
        <section className="book-details book-preview">
            <BookPreview book={book} priceColor={priceColor} onSale={book.listPrice.isOnSale}/>
            <h3>{pageCountTxt}</h3>
            <h3>{(year.getFullYear() - book.publishedDate > 10) ? 'Vintage' : 'New'}</h3>
            <button onClick={onBack}>back</button>
        </section>
    )
}