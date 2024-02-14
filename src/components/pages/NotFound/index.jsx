import { useNavigate, useParams } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <main className="pokemon-not-found">
            <h1 className="pokemon-not-found__title">404</h1>
            <h2 className="pokemon-not-found__subtitle">Pokemon not found</h2>
            <p className="pokemon-not-found__message">
                {`No Pokemon was found by "${id}". Try using another name or id`}
            </p>
            <button
                className="pokemon-not-found__back"
                type="button"
                onClick={() => navigate(-1)}
            >
                {'Back to Home'}
            </button>
        </main>
    );
}

export default NotFound;
