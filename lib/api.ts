const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ========================================
// GENERIC FETCH
// ========================================
async function fetchAPI(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Une erreur est survenue' }));
    throw new Error(error.message || 'Erreur API');
  }

  return res.json();
}

// ========================================
// USER / AUTH
// ========================================
export async function register(data: any) {
  return fetchAPI('/user/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function login(email: string, password: string) {
  return fetchAPI('/user/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// ========================================
// EVENTS
// ========================================
export async function getEvents() {
  return fetchAPI('/event');
}

export async function getEventById(id: string) {
  return fetchAPI(`/event/${id}`);
}

export async function createEvent(data: any, token: string) {
  return fetchAPI('/event', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function updateEvent(id: string, data: any, token: string) {
  return fetchAPI(`/event/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function deleteEvent(id: string, token: string) {
  return fetchAPI(`/event/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function incrementLike(id: string, token?: string) {
  return fetchAPI(`/event/${id}/like`, {
    method: 'PATCH',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export async function decrementLike(id: string, token?: string) {
  return fetchAPI(`/event/${id}/unlike`, {
    method: 'PATCH',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export async function getEventsByLocation(location: string) {
  return fetchAPI(`/event/location/${location}`);
}

export async function getEventsByOrganizer(organizerId: string) {
  return fetchAPI(`/event/organizer/${organizerId}`);
}

export async function getFeedbacksForEvent(id: string) {
  return fetchAPI(`/event/${id}/feedbacks`);
}

// ========================================
// FEEDBACKS
// ========================================
export async function getFeedbacks() {
  return fetchAPI('/feedback');
}

export async function getFeedbackById(id: string) {
  return fetchAPI(`/feedback/${id}`);
}

export async function createFeedback(data: any, token: string) {
  return fetchAPI('/feedback', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function updateFeedback(id: string, data: any, token: string) {
  return fetchAPI(`/feedback/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function deleteFeedback(id: string, token: string) {
  return fetchAPI(`/feedback/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getFeedbacksByUser(userId: string) {
  return fetchAPI(`/feedback/user/${userId}`);
}

export async function getFeedbacksByEvent(eventId: string) {
  return fetchAPI(`/feedback/event/${eventId}`);
}
