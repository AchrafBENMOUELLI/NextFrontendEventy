import { getEvents } from '@/lib/api';
import EventCard from '@/components/events/EventCard';

export const metadata = { title: 'Événements | Eventy', description: 'Découvrez tous les événements disponibles' };
export default async function EventsPage() {
  const events = await getEvents();



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
              <span className="text-3xl">🎫</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tous les événements
              </h1>
              <p className="text-gray-400 mt-1">
                Découvrez tous nos événements disponibles
              </p>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: any) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 mb-6">
              <span className="text-8xl">🎭</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Aucun événement disponible
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Il n'y a pas encore d'événements. Revenez bientôt pour découvrir de nouvelles expériences !
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <span>💡</span>
              <span className="text-sm">Astuce: Les organisateurs peuvent créer de nouveaux événements</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
