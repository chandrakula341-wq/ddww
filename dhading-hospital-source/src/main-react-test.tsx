import { createRoot } from 'react-dom/client';

function SimpleApp() {
  return (
    <div style={{ padding: '20px', fontSize: '24px', fontWeight: 'bold', color: '#00A64C', background: 'white' }}>
      <h1>React is working!</h1>
      <p>Component rendered successfully.</p>
    </div>
  );
}

console.log('React test script loaded');
const root = document.getElementById('root');
console.log('Root element:', root);

if (root) {
  console.log('Creating React root');
  createRoot(root).render(<SimpleApp />);
  console.log('React root rendered');
} else {
  console.error('No root element found');
}
