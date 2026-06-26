import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
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
        setWorkouts(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        setError(err.message);
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
