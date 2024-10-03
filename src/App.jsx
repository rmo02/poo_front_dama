import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import Home from './pages/Home';
import News from './pages/News';
import Tournaments from './pages/Tournaments';
import ContactPage from './pages/ContactPage';
import Ranking from './pages/Ranking';
import { UserProvider, useUser } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/admin" element={<ProtectedAdminRoute><AdminPanel /></ProtectedAdminRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

// Rota protegida para Admin
const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin } = useUser();

  if (!isAdmin()) {
    return <Navigate to="/" />; // Redireciona para a página inicial se não for admin
  }

  return children;
};

export default App;
