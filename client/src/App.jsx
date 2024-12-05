import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './homePage';

import { RedirectPage } from './redirectPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/:url' element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
