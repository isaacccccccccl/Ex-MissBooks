import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate} = ReactRouter
const { Link } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const year = new Date()
    const navigate = useNavigate

    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingReview, setIsLoadingReview] = useState(false)
    const [isShowReviewModal, setIsShowReviewModal] = useState(null)

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(setBook)
            .catch(() => {
                showErrorMsg('Couldnt get book...')
                navigate(`/book`)
            })
            .finally(() => setIsLoading(false))
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

    function onToggleReviewModal() {
        setIsShowReviewModal((prevIsReviewModal) => !prevIsReviewModal)
    }

    function onSaveReview(reviewToAdd) {
        console.log(book)
        console.log(reviewToAdd)
        setIsLoadingReview(true)
        bookService.saveReview(book.id, reviewToAdd)
            .then((review => {
                setBook(prevBook => {
                    console.log(prevBook, review)
                    const reviews = [review, ...prevBook.reviews]
                    return { ...prevBook, reviews }
                })
            }))
            .catch(() => showErrorMsg(`Review to ${book.title} Failed!`))
            .finally(() => setIsLoadingReview(false))
    }

    function onRemoveReview(reviewId) {
        setIsLoadingReview(true)
        bookService.removeReview(book.id, reviewId)
            .then(() => {
                const filteredReviews = book.reviews.filter(review => review.id !== reviewId)
                setBook({ ...book, reviews: filteredReviews })
            })
            .finally(() => setIsLoadingReview(false))
    }

    if (isLoading || !book) return <div className="loader">Loading...</div>
    const isOn = book.listPrice.isOnSale ? 'sale-sign' : ''
    const { title, id, thumbnail, description, authors, listPrice, publishedDate } = book
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
            <div className='brake-line'></div>
            <button onClick={onToggleReviewModal}>Add Review</button>
            {isShowReviewModal && (
                <AddReview
                    toggleReview={onToggleReviewModal}
                    saveReview={onSaveReview}
                />
            )}

            {!!book.reviews.length && (
                <div className='review-container'>
                    {!isLoadingReview
                        ? <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />
                        : <div className="loader"></div>
                    }
                </div>)
            }
        </section>
    )
}