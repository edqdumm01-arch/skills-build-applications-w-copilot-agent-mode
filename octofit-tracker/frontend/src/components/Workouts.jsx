import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
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

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) throw new Error('Failed to fetch workouts');
        const data = await response.json();
        setWorkouts(normalizeItems(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch workouts');
      }
    };

    loadWorkouts();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Workouts</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout._id || workout.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text">Category: {workout.category}</p>
                <p className="card-text text-muted">{workout.durationMinutes} min • {workout.difficulty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
