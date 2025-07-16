import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './characterDetails.css';

interface CharacterDetail {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
}

const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<CharacterDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get<CharacterDetail>(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => {
        setCharacter(res.data);
        setError(null);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch character details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!character) return <p>No character found.</p>;

  return (
    <div className='parent-container'>
    <div className="character-detail-container">
      <img src={character.image} alt={character.name} className="character-detail-image" />
      <h2>{character.name}</h2>
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Origin:</strong> {character.origin.name}</p>
      <p><strong>Location:</strong> {character.location.name}</p>
    </div>
    </div>

  );
};

export default CharacterDetailPage;
