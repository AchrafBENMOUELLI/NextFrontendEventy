'use client';
import { deleteEvent } from '@/lib/api';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getEventById,
  incrementLike,
  decrementLike,
  getFeedbacksByEvent,
  createFeedback,
} from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import FeedbackCard from '@/components/feedback/FeedbackCard';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import { Feedback as FeedbackType } from '@/types/feedback';

export default function EventDetailsPage() {

  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);

  const { token, isLoggedIn, user } = useAuthStore();

  const storageKey =
    user && event ? `liked-event-${event._id}-${user._id}` : null;

    useEffect(() => {
    document.title = 'DetailEvent | Eventy';
  }, []);
  // Fetch event
  useEffect(() => {
    async function fetchEvent() {
      const data = await getEventById(id);
      setEvent(data);
      setLoading(false);
    }
    fetchEvent();
  }, [id]);

  // Restore like state from localStorage
  useEffect(() => {
    if (storageKey) {
      const liked = localStorage.getItem(storageKey);
      setHasLiked(!!liked);
    }
  }, [storageKey]);

  // Fetch feedbacks for this event
  useEffect(() => {
    if (!event) return;

    async function fetchFeedbacks() {
      const data = await getFeedbacksByEvent(event._id);
      setFeedbacks(data);
    }

    fetchFeedbacks();
  }, [event]);

  const handleLike = async () => {
    if (!isLoggedIn || hasLiked || !storageKey) return;

    await incrementLike(event._id, token || undefined);
    setEvent({ ...event, nbrLike: event.nbrLike + 1 });
    setHasLiked(true);
    localStorage.setItem(storageKey, 'true');
  };

  const handleUnlike = async () => {
    if (!isLoggedIn || !hasLiked || !storageKey) return;

    await decrementLike(event._id, token || undefined);
    setEvent({ ...event, nbrLike: Math.max(0, event.nbrLike - 1) });
    setHasLiked(false);
    localStorage.removeItem(storageKey);
  };

  const handleAddFeedback = async (content: string, rate: number) => {
    if (!token || !user || !event) return;

    const newFeedback = await createFeedback(
      { id_event: event._id, id_user: user._id, content, rate },
      token
    );

    setFeedbacks([newFeedback, ...feedbacks]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 mb-4">
            <svg className="animate-spin h-12 w-12 text-purple-400" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 mb-4">
            <span className="text-6xl">😕</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Événement introuvable</h2>
          <p className="text-gray-400 mb-6">Cet événement n'existe pas ou a été supprimé</p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            ← Retour aux événements
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto p-6 py-12">
        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>

        {/* Main Content Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 p-8 mb-8">
          {/* Title & Edit/Delete Buttons */}
<div className="flex items-start justify-between mb-6">
  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex-1">
    {event.title}
  </h1>

  {isLoggedIn && (user?.role === 'admin' || user?._id === event.organizerId._id) && (
    <div className="flex gap-2">
      {/* Edit Button */}
      <Link
        href={`/events/edit/${event._id}`}
        className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600 border border-blue-500/50 hover:border-transparent text-blue-300 hover:text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 group"
      >
        <span className="group-hover:rotate-12 transition-transform duration-300">✏️</span>
        Modifier
      </Link>

      {/* Delete Button */}
      <button
        onClick={async () => {
          await deleteEvent(event._id, user.token);
          router.push('/events');
        }}
        className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600 border border-red-500/50 hover:border-transparent text-red-300 hover:text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 group"
      >
        <span className="group-hover:rotate-12 transition-transform duration-300">🗑️</span>
        Supprimer
      </button>
    </div>
  )}
</div>


          {/* Location & Date */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-purple-400">📍</span>
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pink-400">📅</span>
              <span>
                {new Date(event.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed mb-8 text-lg">{event.description}</p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-2xl font-bold text-white">{event.price} TND</div>
              <div className="text-gray-400 text-sm">Prix</div>
            </div>

            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🎟️</div>
              <div className="text-2xl font-bold text-white">{event.nbPlaces}</div>
              <div className="text-gray-400 text-sm">Places disponibles</div>
            </div>

            <div className="bg-gradient-to-br from-pink-600/20 to-red-600/20 border border-pink-500/30 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">❤️</div>
              <div className="text-2xl font-bold text-white">{event.nbrLike}</div>
              <div className="text-gray-400 text-sm">J'aime</div>
            </div>
          </div>

          {/* Like/Unlike Buttons */}
          {isLoggedIn && (
            <div className="flex gap-4">
              <button
                onClick={handleLike}
                disabled={hasLiked}
                className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 rounded-lg transition-all duration-300 ${
                  hasLiked
                    ? 'bg-slate-700/50 text-gray-500 cursor-not-allowed border border-slate-600'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50'
                }`}
              >
                <span className={hasLiked ? '' : 'animate-pulse'}>❤️</span>
                {hasLiked ? 'Déjà aimé' : 'J\'aime'}
              </button>

              <button
                onClick={handleUnlike}
                disabled={!hasLiked}
                className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 rounded-lg transition-all duration-300 ${
                  !hasLiked
                    ? 'bg-slate-700/50 text-gray-500 cursor-not-allowed border border-slate-600'
                    : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50'
                }`}
              >
                <span>💔</span>
                Je n'aime plus
              </button>
            </div>
          )}
        </div>

        {/* Feedback Form */}
        {isLoggedIn && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">Ajouter un avis</h2>
            </div>
            <FeedbackForm onSubmit={handleAddFeedback} />
          </div>
        )}

        {/* Feedback List */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">
              Avis de la communauté
              <span className="ml-2 text-gray-400 text-lg">({feedbacks.length})</span>
            </h2>
          </div>

          {feedbacks.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">💭</div>
              <p className="text-gray-400 text-lg">Aucun avis pour le moment</p>
              <p className="text-gray-500 text-sm mt-2">Soyez le premier à partager votre expérience !</p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((fb) => (
                <FeedbackCard key={fb._id} feedback={fb} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
