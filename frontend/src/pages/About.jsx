import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)', 
        color: 'white', 
        padding: '50px 40px', 
        borderRadius: '16px',
        marginBottom: '40px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(79, 70, 229, 0.3)'
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          margin: '0 auto 20px',
          border: '4px solid rgba(255, 255, 255, 0.3)'
        }}>
          📚
        </div>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '15px', fontWeight: '700' }}>
          About Studies-Verse
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.95, lineHeight: '1.6' }}>
          Your comprehensive digital learning companion for organized and effective studying
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="card" style={{ 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '5rem', opacity: 0.1 }}>
            🎯
          </div>
          <h3 style={{ marginBottom: '15px', fontSize: '1.3rem', fontWeight: '600' }}>Our Mission</h3>
          <p style={{ opacity: 0.9, fontSize: '0.95rem', lineHeight: '1.5' }}>
            To empower students with intuitive tools that make learning more organized, efficient, and enjoyable
          </p>
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
            💡
          </div>
          <h3 style={{ marginBottom: '15px', fontSize: '1.3rem', fontWeight: '600' }}>Our Vision</h3>
          <p style={{ opacity: 0.9, fontSize: '0.95rem', lineHeight: '1.5' }}>
            To create a world where every student has access to powerful digital tools that enhance their educational journey
          </p>
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
            🚀
          </div>
          <h3 style={{ marginBottom: '15px', fontSize: '1.3rem', fontWeight: '600' }}>Innovation</h3>
          <p style={{ opacity: 0.9, fontSize: '0.95rem', lineHeight: '1.5' }}>
            Continuously evolving with cutting-edge features to meet the changing needs of modern education
          </p>
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
          ✨ Key Features
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '15px',
            padding: '20px',
            background: '#f0f9ff',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '1.8rem' }}>📚</div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>Subject Management</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                Organize your study materials by subject with easy-to-use categorization and search functionality
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '15px',
            padding: '20px',
            background: '#f0fdf4',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '1.8rem' }}>📝</div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>Smart Notes</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                Create, edit, and organize your study notes with rich formatting and powerful search capabilities
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '15px',
            padding: '20px',
            background: '#fef3c7',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '1.8rem' }}>📊</div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>Progress Tracking</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                Monitor your learning progress with detailed statistics and visual insights
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '15px',
            padding: '20px',
            background: '#f3e8ff',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '1.8rem' }}>🔒</div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>Secure & Private</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                Your data is encrypted and secure, ensuring complete privacy for your academic information
              </p>
            </div>
          </div>
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
          🌟 Why Choose Studies-Verse?
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            padding: '20px',
            background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
            borderRadius: '12px',
            borderLeft: '4px solid #4f46e5'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              flexShrink: 0
            }}>
              🎯
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '8px', color: '#1f2937', fontSize: '1.1rem' }}>
                User-Centric Design
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Built with students in mind, our intuitive interface makes it easy to focus on what matters most - your learning.
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            padding: '20px',
            background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
            borderRadius: '12px',
            borderLeft: '4px solid #f093fb'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              flexShrink: 0
            }}>
              ⚡
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '8px', color: '#1f2937', fontSize: '1.1rem' }}>
                Lightning Fast Performance
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Optimized for speed and efficiency, ensuring you can access your study materials instantly, anytime, anywhere.
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            padding: '20px',
            background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
            borderRadius: '12px',
            borderLeft: '4px solid #4facfe'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              flexShrink: 0
            }}>
              🔄
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '8px', color: '#1f2937', fontSize: '1.1rem' }}>
                Continuous Improvement
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
                We're constantly adding new features and improvements based on student feedback and educational research.
              </p>
            </div>
          </div>
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
          📬 Get in Touch
        </h2>
        
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '20px', lineHeight: '1.6' }}>
            Have questions, suggestions, or feedback? We'd love to hear from you!
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' }}>
            <div style={{ 
              padding: '20px',
              background: '#f0f9ff',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📧</div>
              <h4 style={{ fontWeight: '600', marginBottom: '5px', color: '#1f2937' }}>Email</h4>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>support@studies-verse.com</p>
            </div>
            
            <div style={{ 
              padding: '20px',
              background: '#f0fdf4',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💬</div>
              <h4 style={{ fontWeight: '600', marginBottom: '5px', color: '#1f2937' }}>Live Chat</h4>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Available 24/7</p>
            </div>
            
            <div style={{ 
              padding: '20px',
              background: '#fef3c7',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🐦</div>
              <h4 style={{ fontWeight: '600', marginBottom: '5px', color: '#1f2937' }}>Social Media</h4>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>@studiesverse</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '20px', 
          color: '#1f2937'
        }}>
          🚀 Ready to Start Your Journey?
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '25px', fontSize: '1rem', lineHeight: '1.6' }}>
          Join thousands of students who are already transforming their study experience with Studies-Verse
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <Link to="/register" className="btn" style={{ 
            textAlign: 'center',
            padding: '15px 25px',
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            border: 'none'
          }}>
            🎉 Get Started Free
          </Link>
          <Link to="/dashboard" className="btn btn-secondary" style={{ 
            textAlign: 'center',
            padding: '15px 25px',
            fontSize: '1rem'
          }}>
            🏠 View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
