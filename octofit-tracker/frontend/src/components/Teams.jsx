import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        setTeams(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        setError(err.message);
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
