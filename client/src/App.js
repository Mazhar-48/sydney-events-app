import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('https://sydney-events-api-poa8.onrender.com/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleGetTickets = (url) => {
    const email = prompt("Enter email for tickets:");
    if(email) window.open(url, '_blank');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>Sydney Events Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {events.map((event, i) => (
          <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{event.title}</h3>
            <p>📍 {event.city || 'Sydney'}</p>
            <button 
              onClick={() => handleGetTickets(event.source_url)}
              style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              GET TICKETS
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;