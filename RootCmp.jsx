import { AppHeader } from "./cmps/AppHeader.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { About } from "./pages/About.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { Home } from "./pages/Home.jsx"


const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />

                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/about" element={<About />}></Route>
                        <Route path="/book" element={<BookIndex />}></Route>
                        <Route path="/book/:bookId" element={<BookDetails />}></Route>
                        <Route path="/book/edit" element={<BookEdit />}></Route>
                        <Route path="/book/edit/:bookId" element={<BookEdit />}></Route>
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
} 