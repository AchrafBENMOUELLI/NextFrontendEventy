'use client';

import { useState } from 'react';

interface FeedbackFormProps {
  onSubmit: (content: string, rate: number) => void;
}

export default function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [content, setContent] = useState('');
  const [rate, setRate] = useState(5);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    onSubmit(content, rate);
    setContent('');
    setRate(5);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Laissez votre avis
        </h3>
        <p className="text-gray-400 text-sm">Partagez votre expérience avec la communauté</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Textarea */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-purple-400">
            💬 Votre commentaire <span className="text-red-400">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Partagez votre expérience, ce que vous avez aimé ou ce qui pourrait être amélioré..."
            rows={4}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm hover:bg-slate-700/70 resize-none"
            required
          />
          <div className="text-right mt-1">
            <span className="text-xs text-gray-500">
              {content.length} caractères
            </span>
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            ⭐ Votre note
          </label>

          {/* Interactive Stars */}
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRate(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                className="text-4xl transition-all duration-200 hover:scale-125 focus:outline-none"
              >
                <span
                  className={`${
                    star <= (hoveredStar ?? rate)
                      ? 'text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]'
                      : 'text-gray-600'
                  }`}
                >
                  {star <= (hoveredStar ?? rate) ? '★' : '☆'}
                </span>
              </button>
            ))}
          </div>

          {/* Rating Description */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 px-3 py-1 rounded-full">
              <span className="text-yellow-400 font-bold text-sm">
                {rate.toFixed(1)} / 5.0
              </span>
            </div>
            <span className="text-gray-400 text-sm">
              {rate === 5 && '✨ Excellent !'}
              {rate === 4 && '👍 Très bien'}
              {rate === 3 && '😊 Bien'}
              {rate === 2 && '😐 Moyen'}
              {rate === 1 && '😞 Décevant'}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!content}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-2"
        >
          <span>✉️</span>
          <span>Envoyer mon avis</span>
        </button>
      </form>
    </div>
  );
}
