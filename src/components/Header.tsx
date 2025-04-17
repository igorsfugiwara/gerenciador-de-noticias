import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className='header'>
        <h1>Gerenciador de Notícias</h1>
        <nav>
            <Link to="/">Feed</Link>
            <Link to="/admin">Admin</Link>
        </nav>
        </header>
    );
}
