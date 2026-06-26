import { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';
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

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(getApiUrl());
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        setTeams(normalizeItems(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch teams');
      }
    };

    loadTeams();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Teams</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {teams.map((team) => (
          <div key={team._id || team.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">Focus: {team.focus}</p>
                <p className="card-text text-muted">Captain: {team.captain}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
