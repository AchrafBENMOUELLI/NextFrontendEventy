'use client';

import { Feedback } from '@/types/feedback';

interface FeedbackCardProps {
  feedback: Feedback;
}

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5 shadow-lg hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
            {feedback.id_user?.toString().charAt(0).toUpperCase() || '?'}
          </div>
          <div>
            <span className="font-semibold text-white text-sm block">
              {feedback.id_user || 'Utilisateur'}
            </span>
            <span className="text-gray-400 text-xs">
              {new Date(feedback.date || '').toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 px-3 py-1 rounded-full">
          <span className="text-yellow-400 font-bold text-sm">
            {feedback.rate.toFixed(1)} ⭐
          </span>
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-2xl transition-all duration-300 ${
              i < feedback.rate
                ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] group-hover:scale-110'
                : 'text-gray-600'
            }`}
          >
            {i < feedback.rate ? '★' : '☆'}
          </span>
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-300 leading-relaxed">
        {feedback.content}
      </p>

      {/* Decorative gradient line */}
      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
    </div>
  );
}
