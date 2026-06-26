import { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return `${baseUrl}/api/activities/`;
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

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(getApiUrl());
        if (!response.ok) throw new Error('Failed to fetch activities');
        const data = await response.json();
        setActivities(normalizeItems(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch activities');
      }
    };

    loadActivities();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Activities</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {activities.map((activity) => (
          <div key={activity._id || activity.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{activity.type}</h5>
                <p className="card-text">User: {activity.user}</p>
                <p className="card-text text-muted">Duration: {activity.durationMinutes} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
