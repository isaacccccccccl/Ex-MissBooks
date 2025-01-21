import { bookService } from "../services/book.service.js"
import { TextboxRating } from "./TextboxRating.jsx"
import { SelectRating } from "./dynamic-inputs/SelectRating.jsx"

const { useState, useEffect, useRef } = React

export function AddReview({ saveReview, toggleReview }) {
    const inputRef = useRef()
    const [review, setReview] = useState(bookService.getDefaultReview())

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function onAddReview(ev) {
        ev.preventDefault()
        const newReview = { ...review, date: new Date(review.date).getTime() }
        saveReview(newReview)
        toggleReview()
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    const { fullName, date, txt, rating } = review
    return (
        <section className='review-add'>
            <form onSubmit={onAddReview} className='review-form'>
                <div className='review-modal'>
                    <h1>Add review</h1>
                    <button className='btn-toggle-modal'
                        onClick={toggleReview}>X
                    </button>
                    <label className='bold-txt' htmlFor='fullname'>Full name:</label>
                    <input
                        autoFocus
                        ref={inputRef}
                        placeholder='Enter full name'
                        name='fullName'
                        type='text'
                        id='fullname'
                        value={fullName}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                    <label className='bold-txt' htmlFor='date'>Date:</label>

                    <input
                        type='date'
                        id='date'
                        name='date'
                        value={date}
                        onChange={handleChange}
                    />


                    <section>
                        <SelectRating handleChange={handleChange} rating={rating} />
                    </section>
                    <TextboxRating handleChange={handleChange} txt={txt} />
                    <button>Save</button>
                </div>
            </form>
        </section>
    )
}