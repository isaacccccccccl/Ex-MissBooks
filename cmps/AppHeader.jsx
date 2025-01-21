
const {NavLink} = ReactRouterDOM

export function AppHeader() {


    return (
        <header className="app-header">
            <h1>Miss Books</h1>
            <nav className="app-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/book">Book</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>

    )
}