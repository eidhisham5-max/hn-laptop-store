export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h1 style={{ 
          color: '#333', 
          marginBottom: '20px',
          fontSize: '2.5rem'
        }}>
          🎉 H.N Laptop Store
        </h1>
        <p style={{ 
          color: '#666', 
          fontSize: '1.2rem',
          marginBottom: '30px'
        }}>
          الموقع يعمل بنجاح! جميع المشاكل تم حلها.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#e3f2fd',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: '#1976d2', marginBottom: '10px' }}>✅ Next.js 15.5.2</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>يعمل بشكل مثالي</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#e8f5e8',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: '#388e3c', marginBottom: '10px' }}>🎨 Tailwind CSS</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>التصميم جاهز</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#fff3e0',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: '#f57c00', marginBottom: '10px' }}>⚡ TypeScript</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>مُحسن ومُحدث</p>
          </div>
        </div>
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>🚀 الموقع جاهز للاستخدام!</h3>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            يمكنك الآن إضافة المكونات والتصاميم التي تريدها. 
            جميع الإعدادات الأساسية تعمل بشكل مثالي.
          </p>
        </div>
      </div>
    </div>
  )
}