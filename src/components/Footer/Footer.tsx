import './Footer.css';

export default function Footer() {
    return (
        <footer className='footer'>
        <p>Desenvolvido por Igor Fugiwara</p>
        <ul className="social-icons">
            <li>
            <a
                href="https://www.linkedin.com/in/igor-sim%C3%B5es-fugiwara-2283b2205/"
                target="_blank"
            >
                <i className="fab fa-linkedin"></i>
            </a>
            </li>
            <li>
            <a href="https://github.com/igorsfugiwara" target="_blank">
                <i className="fab fa-github"></i>
            </a>
            </li>
        </ul>
        </footer>
    );
}
