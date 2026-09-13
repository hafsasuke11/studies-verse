import { useEffect, useState } from 'react';
import api from '../utils/api';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNote, setExpandedNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [notes, selectedSubject, searchQuery]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [notesRes, subjectsRes] = await Promise.all([
        api.getNotes(),
        api.getSubjects()
      ]);
      
      setNotes(notesRes.data.notes || []);
      setSubjects(subjectsRes.data.subjects || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterNotes = () => {
    let filtered = [...notes];

    if (selectedSubject) {
      filtered = filtered.filter(note => note.subjectId === parseInt(selectedSubject));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.author.toLowerCase().includes(query)
      );
    }

    setFilteredNotes(filtered);
  };

  const handleSubjectChange = async (e) => {
    const subjectId = e.target.value;
    setSelectedSubject(subjectId);
    
    if (subjectId) {
      try {
        const response = await api.getNotes(subjectId);
        setNotes(response.data.notes || []);
      } catch (error) {
        console.error('Failed to filter notes:', error);
      }
    } else {
      try {
        const response = await api.getNotes();
        setNotes(response.data.notes || []);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    }
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown Subject';
  };

  const getSubjectColor = (subjectId) => {
    const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
    return colors[subjectId % colors.length];
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  const getWordCount = (content) => {
    return content.split(/\s+/).filter(word => word.length > 0).length;
  };

  const toggleExpand = (noteId) => {
    setExpandedNote(expandedNote === noteId ? null : noteId);
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
        <p style={{ color: '#6b7280' }}>Loading notes...</p>
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
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#1f2937' }}>
          📝 Study Notes
        </h1>
        
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <input
              type="text"
              placeholder="🔍 Search notes by title, content, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ width: '100%' }}
            />
          </div>
          
          <select 
            value={selectedSubject}
            onChange={handleSubjectChange}
            className="form-control"
            style={{ width: '200px' }}
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          
          <div style={{ 
            backgroundColor: '#dbeafe', 
            color: '#1e40af', 
            padding: '10px 20px', 
            borderRadius: '25px',
            fontWeight: '600',
            fontSize: '0.95rem',
            whiteSpace: 'nowrap'
          }}>
            {filteredNotes.length} {filteredNotes.length === 1 ? 'Note' : 'Notes'}
          </div>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📭</div>
          <h3 style={{ marginBottom: '10px', color: '#1f2937' }}>No notes found</h3>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            {searchQuery || selectedSubject 
              ? 'Try adjusting your filters or search query.' 
              : 'Start exploring subjects to find notes!'}
          </p>
          {searchQuery && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('');
              }}
              className="btn"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {filteredNotes.map((note) => {
            const isExpanded = expandedNote === note.id;
            const wordCount = getWordCount(note.content);
            const readingTime = calculateReadingTime(note.content);
            const subjectColor = getSubjectColor(note.subjectId);
            
            return (
              <div 
                key={note.id} 
                className="card"
                style={{
                  transition: 'all 0.3s ease',
                  borderLeft: `4px solid ${subjectColor}`,
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                      <h2 style={{ 
                        marginBottom: '10px', 
                        fontSize: '1.5rem',
                        color: '#1f2937',
                        fontWeight: '600'
                      }}>
                        {note.title}
                      </h2>
                      
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ 
                          backgroundColor: subjectColor,
                          color: 'white',
                          padding: '6px 14px', 
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>
                          {getSubjectName(note.subjectId)}
                        </span>
                        
                        <span style={{ 
                          backgroundColor: '#f3f4f6',
                          color: '#4b5563',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          ⏱️ {readingTime} min read
                        </span>
                        
                        <span style={{ 
                          backgroundColor: '#f3f4f6',
                          color: '#4b5563',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          📊 {wordCount} words
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '15px',
                    borderTop: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${subjectColor}, ${subjectColor}dd)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '0.875rem'
                      }}>
                        {note.author?.charAt(0).toUpperCase() || 'A'}
                      </div>
                      <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                          {note.author}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                          {new Date(note.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  marginBottom: '20px',
                  lineHeight: '1.8',
                  color: '#4b5563'
                }}>
                  {isExpanded ? (
                    <div>
                      <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
                    </div>
                  ) : (
                    <p>
                      {note.content.length > 200 
                        ? `${note.content.substring(0, 200)}...` 
                        : note.content}
                    </p>
                  )}
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  flexWrap: 'wrap',
                  paddingTop: '20px',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <button 
                    onClick={() => toggleExpand(note.id)}
                    className="btn" 
                    style={{ 
                      fontSize: '0.875rem', 
                      padding: '10px 20px',
                      background: subjectColor,
                      border: 'none'
                    }}
                  >
                    {isExpanded ? '📄 Show Less' : '📖 Read More'}
                  </button>
                  
                  <button 
                    className="btn btn-secondary" 
                    style={{ 
                      fontSize: '0.875rem', 
                      padding: '10px 20px'
                    }}
                    onClick={() => {
                      const blob = new Blob([`${note.title}\n\n${note.content}\n\nAuthor: ${note.author}\nDate: ${note.date}`], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${note.title.replace(/\s+/g, '_')}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    💾 Download
                  </button>
                  
                  <button 
                    className="btn btn-secondary" 
                    style={{ 
                      fontSize: '0.875rem', 
                      padding: '10px 20px'
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
                      alert('Note copied to clipboard!');
                    }}
                  >
                    📋 Copy
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

export default Notes;