import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
              <h1>🎓 StudiesVerse</h1>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span>Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          </div>
          
          <nav style={{ marginTop: '20px' }}>
            <ul style={{ 
              display: 'flex', 
              gap: '20px', 
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li>
                <Link 
                  to="/dashboard" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/subjects" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Subjects
                </Link>
              </li>
              <li>
                <Link 
                  to="/notes" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Notes
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2024 StudiesVerse - Your Academic Companion</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
