import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header style={{ padding: '1rem', backgroundColor: '#eee' }}>
        <h1>Gerenciador de Notícias</h1>
        <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/">Feed</Link>
            <Link to="/admin">Admin</Link>
        </nav>
        </header>
    );
}
