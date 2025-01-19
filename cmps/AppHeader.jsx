

export function AppHeader({ setPage }) {

    function onSetPage(ev, page) {
        ev.preventDefault()
        setPage(page)
    }

    return (
        <header className="app-header full main-layout">
            <section className="flex space-between align-center">
                <h1>Book Shop</h1>
                <nav className="app-nav flex gap">
                    <a onClick={(ev) => onSetPage(ev, 'home')} href="" >Home</a>
                    <a onClick={(ev) => onSetPage(ev, 'about')} href="" >About</a>
                    <a onClick={(ev) => onSetPage(ev, 'book')} href="">Book</a>
                </nav>
            </section>
        </header>
    )
}