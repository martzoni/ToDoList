// frontend/src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Todo App</Link>
      </div>

      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <span className="navbar-username">Bonjour, {user?.username}</span>
            <button className="navbar-logout" onClick={handleLogout}>
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link className="navbar-link" to="/login">Connexion</Link>
            <Link className="navbar-link" to="/register">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
