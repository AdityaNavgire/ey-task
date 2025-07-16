import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { fetchCharacters } from '../../redux/userSlice';
import { Link } from 'react-router-dom';
import './character.css';

const CharacterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, loading, error } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCharacters(page)).then((res) => {
      console.log('API Response:', res);
    });
  }, [dispatch, page]);

  return (
    <div className="character-page-container">
      <h2>Character List</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="character-list">
        {characters.map((char) => (
          <Link key={char.id} to={`/character/${char.id}`} className="character-link">
            <div className="character-card">
              <img src={char.image} alt={char.name} className="character-image" />
              <p>{char.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Previous
        </button>
        <span className="page-number">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterPage;