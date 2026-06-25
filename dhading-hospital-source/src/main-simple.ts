console.log('Simple JS loaded');

const root = document.getElementById('root');
if (root) {
  root.innerHTML = '<div style="padding: 20px; font-size: 24px; font-weight: bold; color: #00A64C; background: white;">JavaScript loaded successfully!</div>';
  console.log('Content added to root');
} else {
  console.error('Root element not found');
  document.body.innerHTML = '<div>ERROR: Root not found</div>';
}
