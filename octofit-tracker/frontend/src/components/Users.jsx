import { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';
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

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(getApiUrl());
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(normalizeItems(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Users</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {users.map((user) => (
          <div key={user._id || user.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <p className="card-text text-muted">Goal: {user.fitnessGoal}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
