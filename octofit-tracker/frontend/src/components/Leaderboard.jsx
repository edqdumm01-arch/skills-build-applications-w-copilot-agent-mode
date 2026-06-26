import { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return `${baseUrl}/api/leaderboard/`;
};

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const candidates = [payload.data, payload.results, payload.items, payload.records, payload.content];
    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate;
      }
    }
  }

  return [];
};

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(getApiUrl());
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        const data = await response.json();
        setEntries(normalizeItems(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {entries.map((entry) => (
          <div key={entry._id || entry.user} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{entry.user}</h5>
              <p className="mb-0 text-muted">Streak: {entry.streak} days</p>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
