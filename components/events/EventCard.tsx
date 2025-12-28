import Link from 'next/link';

interface Props {
  event: any;
}

export default function EventCard({ event }: Props) {
  return (
    <div className="group bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-3 py-1.5 rounded-full text-sm shadow-lg backdrop-blur-sm">
          {event.price} TND
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
          {event.title}
        </h2>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <span className="text-purple-400">📍</span>
            {event.location}
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <span className="text-pink-400">📅</span>
            {new Date(event.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>

        {/* Details Button */}
        <Link
          href={`/events/${event._id}`}
          className="block w-full text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600 hover:to-pink-600 border border-purple-500/50 hover:border-transparent text-purple-300 hover:text-white font-semibold py-2.5 rounded-lg transition-all duration-300 group/btn"
        >
          <span className="flex items-center justify-center gap-2">
            Voir les détails
            <span className="text-lg group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
