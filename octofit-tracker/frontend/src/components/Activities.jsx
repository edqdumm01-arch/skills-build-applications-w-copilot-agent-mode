import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) throw new Error('Failed to fetch activities');
        const data = await response.json();
        setActivities(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        setError(err.message);
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
