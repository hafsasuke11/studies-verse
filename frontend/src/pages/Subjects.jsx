import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    filterSubjects();
  }, [subjects, searchQuery, selectedTopic]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await api.getSubjects();
      setSubjects(response.data.subjects || []);
    } catch (err) {
      setError('Failed to load subjects. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterSubjects = () => {
    let filtered = [...subjects];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(subject => 
        subject.name.toLowerCase().includes(query) ||
        subject.code.toLowerCase().includes(query) ||
        subject.description.toLowerCase().includes(query) ||
        subject.topics.some(topic => topic.toLowerCase().includes(query))
      );
    }

    if (selectedTopic) {
      filtered = filtered.filter(subject => 
        subject.topics.includes(selectedTopic)
      );
    }

    setFilteredSubjects(filtered);
  };

  const getAllTopics = () => {
    const topics = new Set();
    subjects.forEach(subject => {
      subject.topics?.forEach(topic => topics.add(topic));
    });
    return Array.from(topics).sort();
  };

  const getSubjectColor = (id) => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    ];
    return colors[id % colors.length];
  };

  const handleViewNotes = (subjectId) => {
    navigate(`/notes?subjectId=${subjectId}`);
  };

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
        <p style={{ color: '#6b7280' }}>Loading subjects...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⚠️</div>
        <h3 style={{ marginBottom: '10px', color: '#1f2937' }}>Error Loading Subjects</h3>
        <p style={{ color: '#ef4444', marginBottom: '20px' }}>{error}</p>
        <button onClick={fetchSubjects} className="btn">
          🔄 Retry
        </button>
      </div>
    );
  }

  const allTopics = getAllTopics();

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#1f2937', margin: 0 }}>
            📚 Academic Subjects
          </h1>
          <div style={{ 
            backgroundColor: '#dbeafe', 
            color: '#1e40af', 
            padding: '10px 20px', 
            borderRadius: '25px',
            fontWeight: '600',
            fontSize: '0.95rem'
          }}>
            {filteredSubjects.length} {filteredSubjects.length === 1 ? 'Subject' : 'Subjects'}
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <input
              type="text"
              placeholder="🔍 Search subjects by name, code, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ width: '100%' }}
            />
          </div>
          
          {allTopics.length > 0 && (
            <select 
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="form-control"
              style={{ width: '200px' }}
            >
              <option value="">All Topics</option>
              {allTopics.map(topic => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          )}

          {(searchQuery || selectedTopic) && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedTopic('');
              }}
              className="btn btn-secondary"
              style={{ whiteSpace: 'nowrap' }}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {filteredSubjects.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
          <h3 style={{ marginBottom: '10px', color: '#1f2937' }}>No subjects found</h3>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            {searchQuery || selectedTopic 
              ? 'Try adjusting your search or filter criteria.' 
              : 'No subjects available at the moment.'}
          </p>
          {(searchQuery || selectedTopic) && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedTopic('');
              }}
              className="btn"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '24px' 
        }}>
          {filteredSubjects.map((subject) => {
            const gradientColor = getSubjectColor(subject.id);
            
            return (
              <div 
                key={subject.id} 
                className="card" 
                style={{ 
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ 
                  background: gradientColor,
                  color: 'white', 
                  padding: '25px', 
                  borderRadius: '12px',
                  margin: '-24px -24px 25px -24px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }}></div>
                  <h2 style={{ 
                    margin: 0, 
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '8px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {subject.name}
                  </h2>
                  <p style={{ 
                    opacity: 0.95, 
                    marginTop: '5px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {subject.code}
                  </p>
                </div>
                
                <p style={{ 
                  color: '#6b7280', 
                  marginBottom: '20px',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {subject.description}
                </p>
                
                <div style={{ marginBottom: '25px' }}>
                  <h4 style={{ 
                    fontSize: '0.875rem', 
                    color: '#4b5563', 
                    marginBottom: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Topics Covered:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {subject.topics?.map((topic, index) => (
                      <span 
                        key={index} 
                        style={{
                          background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          color: '#4b5563',
                          fontWeight: '500',
                          border: '1px solid #e5e7eb'
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => handleViewNotes(subject.id)}
                    className="btn" 
                    style={{ 
                      flex: 1,
                      padding: '12px',
                      background: gradientColor,
                      border: 'none',
                      fontWeight: '600'
                    }}
                  >
                    📝 View Notes
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    style={{ 
                      padding: '12px 20px',
                      fontWeight: '600'
                    }}
                    onClick={() => {
                      alert(`More details about ${subject.name} coming soon!`);
                    }}
                  >
                    ℹ️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Subjects;