import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ subjects: 0, notes: 0 });
  const [recentNotes, setRecentNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [subjectsRes, notesRes] = await Promise.all([
          api.getSubjects(),
          api.getNotes()
        ]);
        
        const notes = notesRes.data.notes || [];
        setStats({
          subjects: subjectsRes.data.count || 0,
          notes: notesRes.data.count || 0
        });
        
        setRecentNotes(notes.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const calculateProgress = () => {
    if (stats.subjects === 0) return 0;
    const progress = Math.min((stats.notes / (stats.subjects * 2)) * 100, 100);
    return Math.round(progress);
  };

  const progress = calculateProgress();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ 
          width: '50px', 
          height: '50px', 
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #4f46e5',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <p style={{ color: '#6b7280' }}>Loading dashboard...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)', 
        color: 'white', 
        padding: '50px 40px', 
        borderRadius: '16px',
        marginBottom: '40px',
        boxShadow: '0 10px 30px rgba(79, 70, 229, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            {user?.name?.charAt(0).toUpperCase() || '👤'}
          </div>
          <div>
            <h1 style={{ fontSize: '2.8rem', marginBottom: '8px', fontWeight: '700' }}>
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.95 }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px',
        marginBottom: '40px'
      }}>
        <div className="card" style={{ 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '5rem', opacity: 0.1 }}>
            📚
          </div>
          <h3 style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: '500' }}>Total Subjects</h3>
          <p style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: '10px 0' }}>{stats.subjects}</p>
          <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>Available for study</p>
        </div>

        <div className="card" style={{ 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          border: 'none',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '5rem', opacity: 0.1 }}>
            📝
          </div>
          <h3 style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: '500' }}>Study Notes</h3>
          <p style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: '10px 0' }}>{stats.notes}</p>
          <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>Available resources</p>
        </div>

        <div className="card" style={{ 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          border: 'none',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '5rem', opacity: 0.1 }}>
            ⭐
          </div>
          <h3 style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: '500' }}>Learning Progress</h3>
          <p style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: '10px 0' }}>{progress}%</p>
          <div style={{ 
            width: '100%', 
            height: '8px', 
            background: 'rgba(255,255,255,0.3)', 
            borderRadius: '10px',
            marginTop: '15px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'white',
              borderRadius: '10px',
              transition: 'width 0.5s ease'
            }}></div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '25px', fontSize: '1.5rem', color: '#1f2937' }}>
          🚀 Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <Link to="/subjects" className="btn" style={{ 
            textAlign: 'center',
            padding: '15px 25px',
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none'
          }}>
            📚 Browse Subjects
          </Link>
          <Link to="/notes" className="btn" style={{ 
            textAlign: 'center',
            padding: '15px 25px',
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            border: 'none'
          }}>
            📝 View Notes
          </Link>
          <Link to="/profile" className="btn" style={{ 
            textAlign: 'center',
            padding: '15px 25px',
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            border: 'none'
          }}>
            👤 My Profile
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        <div className="card">
          <h2 style={{ marginBottom: '25px', fontSize: '1.5rem', color: '#1f2937' }}>
            📖 Recent Notes
          </h2>
          {recentNotes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#6b7280' }}>
              <p>No notes yet. Start exploring subjects!</p>
              <Link to="/notes" className="btn" style={{ marginTop: '15px', display: 'inline-block' }}>
                Browse Notes
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {recentNotes.map((note) => (
                <div key={note.id} style={{ 
                  padding: '15px',
                  background: '#f9fafb',
                  borderRadius: '8px',
                  borderLeft: '4px solid #4f46e5',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                  <h4 style={{ marginBottom: '8px', color: '#1f2937', fontSize: '1rem' }}>
                    {note.title}
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '5px' }}>
                    {note.content?.substring(0, 60)}...
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                    {note.date} • {note.author}
                  </p>
                </div>
              ))}
              <Link to="/notes" className="btn btn-secondary" style={{ marginTop: '10px', textAlign: 'center' }}>
                View All Notes →
              </Link>
            </div>
          )}
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '25px', fontSize: '1.5rem', color: '#1f2937' }}>
            💡 Study Tips
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '15px',
              padding: '15px',
              background: '#f0f9ff',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '1.5rem' }}>🎯</div>
              <div>
                <p style={{ fontWeight: '500', marginBottom: '5px' }}>Set Clear Goals</p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Define what you want to achieve in each study session
                </p>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '15px',
              padding: '15px',
              background: '#f0fdf4',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '1.5rem' }}>⏰</div>
              <div>
                <p style={{ fontWeight: '500', marginBottom: '5px' }}>Take Regular Breaks</p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Use the Pomodoro technique: 25 min study, 5 min break
                </p>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '15px',
              padding: '15px',
              background: '#fef3c7',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '1.5rem' }}>📚</div>
              <div>
                <p style={{ fontWeight: '500', marginBottom: '5px' }}>Review Regularly</p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Revisit your notes periodically to reinforce learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;