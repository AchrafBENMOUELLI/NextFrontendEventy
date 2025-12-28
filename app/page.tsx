import { getEvents } from '@/lib/api';
import EventCard from '@/components/events/EventCard';
import Link from 'next/link';


export const metadata = { title: 'Accueil | Eventy', description: 'Découvrez les meilleurs événements près de chez vous' }
export default async function HomePage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3">
              <span className="text-4xl animate-bounce">🎉</span>
              <span className="text-sm text-purple-300 font-medium">Découvrez des événements incroyables</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            Bienvenue sur Eventy
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Découvrez, créez et participez aux meilleurs événements près de chez vous
          </p>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 group"
          >
            <span>Voir tous les événements</span>
            <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Events Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">
              Événements à la une
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event: any) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 mb-4">
              <span className="text-6xl">🎭</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Aucun événement pour le moment
            </h3>
            <p className="text-gray-500">
              Revenez bientôt pour découvrir de nouveaux événements !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
