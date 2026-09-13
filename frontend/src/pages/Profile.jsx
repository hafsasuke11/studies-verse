import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ subjects: 0, notes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [subjectsRes, notesRes] = await Promise.all([
          api.getSubjects(),
          api.getNotes()
        ]);
        
        setStats({
          subjects: subjectsRes.data.count || 0,
          notes: notesRes.data.count || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <div style={{ 
          width: '50px', 
          height: '50px', 
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #4f46e5',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <h2>Loading...</h2>
        <p>If you are not redirected, please <Link to="/login">login</Link>.</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getDaysSinceJoin = () => {
    if (!user.createdAt) return 0;
    const joinDate = new Date(user.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysSinceJoin = getDaysSinceJoin();

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '50px 40px',
        marginBottom: '30px',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
          margin: '0 auto 20px',
          border: '4px solid rgba(255, 255, 255, 0.3)'
        }}>
          {getInitials(user.name)}
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', fontWeight: '700' }}>
          {user.name}
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.95 }}>
          {user.email}
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div className="card" style={{ textAlign: 'center', padding: '25px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📚</div>
          <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '5px' }}>
            {stats.subjects}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Subjects</p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '25px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📝</div>
          <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f5576c', marginBottom: '5px' }}>
            {stats.notes}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Notes</p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '25px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📅</div>
          <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4facfe', marginBottom: '5px' }}>
            {daysSinceJoin}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Days Active</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '30px', 
          color: '#1f2937',
          paddingBottom: '15px',
          borderBottom: '2px solid #e5e7eb'
        }}>
          👤 Profile Information
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '20px',
            background: '#f9fafb',
            borderRadius: '12px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              👤
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ 
                color: '#6b7280', 
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '5px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Full Name
              </h3>
              <p style={{ fontSize: '1.25rem', color: '#1f2937', fontWeight: '600' }}>
                {user.name}
              </p>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '20px',
            background: '#f9fafb',
            borderRadius: '12px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              ✉️
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ 
                color: '#6b7280', 
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '5px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Email Address
              </h3>
              <p style={{ fontSize: '1.25rem', color: '#1f2937', fontWeight: '600' }}>
                {user.email}
              </p>
            </div>
          </div>

          {user.createdAt && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              padding: '20px',
              background: '#f9fafb',
              borderRadius: '12px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                📅
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  color: '#6b7280', 
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '5px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Member Since
                </h3>
                <p style={{ fontSize: '1.25rem', color: '#1f2937', fontWeight: '600' }}>
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '5px' }}>
                  {daysSinceJoin} {daysSinceJoin === 1 ? 'day' : 'days'} ago
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '25px', 
          color: '#1f2937',
          paddingBottom: '15px',
          borderBottom: '2px solid #e5e7eb'
        }}>
          ⚡ Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <Link to="/dashboard" className="btn" style={{ 
            textAlign: 'center',
            padding: '15px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            border: 'none'
          }}>
            🏠 Dashboard
          </Link>
          <Link to="/subjects" className="btn" style={{ 
            textAlign: 'center',
            padding: '15px',
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            border: 'none'
          }}>
            📚 Subjects
          </Link>
          <Link to="/notes" className="btn" style={{ 
            textAlign: 'center',
            padding: '15px',
            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            border: 'none'
          }}>
            📝 Notes
          </Link>
        </div>
      </div>

      <button 
        onClick={() => {
          if (window.confirm('Are you sure you want to logout?')) {
            logout();
            navigate('/login');
          }
        }} 
        className="btn" 
        style={{ 
          width: '100%', 
          padding: '15px',
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: 'white',
          border: 'none',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default Profile;

