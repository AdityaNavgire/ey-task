import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterPage from './pages/character/Character';
import CharacterDetailPage from './pages/characterDetails/CharacterDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterPage />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
