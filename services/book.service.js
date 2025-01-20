import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createbooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minPrice) {
              books = books.filter((book1, book2) => book1.minPrice - book2.minPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', amount = '') {
    return { title, listPrice: {amount} }
}

function getDefaultFilter() {
    return { txt: '', minPrice: '' }
}

function _createbooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = _getBooks()
        saveToStorage(BOOK_KEY, books)
    }
}

// function _createbook(vendor, speed = 250) {
//     const book = getEmptybook(vendor, speed)
//     book.id = makeId()
//     return book
// }

function _getBooks() {

    return [
        {
          "id": "OXeMG8wNskc",
          "title": "metus hendrerit",
          "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
          "authors": [
            "Barbara Cartland"
          ],
          "publishedDate": 1999,
          "description": "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
          "pageCount": 713,
          "categories": [
            "Computers",
            "Hack"
          ],
          "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
          "language": "en",
          "listPrice": {
            "amount": 160,
            "currencyCode": "EUR",
            "isOnSale": false
          }
        },
        {
          "id": "JYOJa2NpSCq",
          "title": "morbi",
          "subtitle": "lorem euismod dictumst inceptos mi",
          "authors": [
            "Barbara Cartland"
          ],
          "publishedDate": 1978,
          "description": "aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor",
          "pageCount": 129,
          "categories": [
            "Computers",
            "Hack"
          ],
          "thumbnail": "http://coding-academy.org/books-photos/14.jpg",
          "language": "sp",
          "listPrice": {
            "amount": 44,
            "currencyCode": "EUR",
            "isOnSale": true
          }
        },
        {
          "id": "1y0Oqts35DQ",
          "title": "at viverra venenatis",
          "subtitle": "gravida libero facilisis rhoncus urna etiam",
          "authors": [
            "Dr. Seuss"
          ],
          "publishedDate": 1999,
          "description": "lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant",
          "pageCount": 972,
          "categories": [
            "Computers",
            "Hack"
          ],
          "thumbnail": "http://coding-academy.org/books-photos/2.jpg",
          "language": "he",
          "listPrice": {
            "amount": 108,
            "currencyCode": "ILS",
            "isOnSale": false
          }
        }]
}