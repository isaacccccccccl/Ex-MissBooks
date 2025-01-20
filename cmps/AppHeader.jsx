
const { NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section className="flex space-between align-center">
                <h1>Book Shop</h1>
                <nav className="app-nav flex gap">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/book">Book</NavLink>
                </nav>
            </section>
        </header>
    )
}