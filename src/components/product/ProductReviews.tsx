import React, { useState } from 'react';
import { Star, CheckCircle, Plus, X } from 'lucide-react';
import { Review } from '../../types/ecommerce';
import { REVIEWS } from '../../data/reviews';

interface ProductReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  rating,
  reviewCount
}) => {
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    const existing = REVIEWS.filter((r) => r.productId === productId);
    if (existing.length === 0) {
      // Default sample review if none specific
      return [
        {
          id: `rev-default-${productId}`,
          productId,
          author: 'Astrid L.',
          rating: 5,
          date: 'March 18, 2026',
          title: 'Exquisite construction and presence',
          comment: 'The craftsmanship matches the photography exactly. The drape is effortless and the fabric has a substantial, tactile weight that feels deeply luxurious.',
          verifiedPurchase: true,
          fitFeedback: 'True to Size'
        }
      ];
    }
    return existing;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newFit, setNewFit] = useState<'Runs Small' | 'True to Size' | 'Runs Large'>('True to Size');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      author: newAuthor.trim(),
      rating: newRating,
      date: 'Just now',
      title: newTitle.trim() || 'Exceptional piece',
      comment: newComment.trim(),
      verifiedPurchase: true,
      fitFeedback: newFit
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsModalOpen(false);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
  };

  return (
    <section className="pt-16 mt-16 border-t border-[#E8E3D8]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E8E3D8] gap-6">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5E1924] block mb-1">
            Client Impressions
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">
            Reviews &amp; Fitting Experiences
          </h3>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 py-2 px-5 border border-[#1A1917] hover:bg-[#1A1917] hover:text-[#FBF9F5] text-xs font-semibold tracking-wider uppercase transition-colors rounded-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Summary Score Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#F7F4EE] p-6 sm:p-8 border border-[#E8E3D8] mb-10">
        <div className="md:col-span-4 text-center md:text-left md:border-r border-[#D8D2C5] pr-6">
          <span className="font-serif text-5xl font-light text-[#1A1917]">
            {rating.toFixed(1)}
          </span>
          <div className="flex justify-center md:justify-start gap-1 text-[#5E1924] my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-xs text-[#78746D] tracking-wide">
            Based on {reviewCount + (reviewsList.length > 1 ? reviewsList.length - 1 : 0)} verified client accounts
          </span>
        </div>

        <div className="md:col-span-8 space-y-1.5 text-xs text-[#5C5852]">
          {[
            { stars: '5 Stars', pct: 92 },
            { stars: '4 Stars', pct: 8 },
            { stars: '3 Stars', pct: 0 },
            { stars: '2 Stars', pct: 0 },
            { stars: '1 Star', pct: 0 }
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3">
              <span className="w-14 text-right text-[11px] font-medium">{bar.stars}</span>
              <div className="flex-1 bg-[#E8E3D8] h-2 rounded-full overflow-hidden">
                <div className="bg-[#5E1924] h-full" style={{ width: `${bar.pct}%` }} />
              </div>
              <span className="w-8 text-[11px] text-[#78746D]">{bar.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-6">
        {reviewsList.map((rev) => (
          <div key={rev.id} className="p-6 bg-white border border-[#E8E3D8] rounded-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <div className="flex text-[#5E1924]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= rev.rating ? 'fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <h4 className="font-serif text-base font-medium text-[#1A1917]">
                  {rev.title}
                </h4>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#78746D]">
                <span>{rev.author}</span>
                <span>&bull;</span>
                <span>{rev.date}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed mb-3">
              {rev.comment}
            </p>

            <div className="flex items-center gap-4 text-[11px] text-[#78746D]">
              {rev.verifiedPurchase && (
                <span className="flex items-center gap-1 text-emerald-800 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Purchase</span>
                </span>
              )}
              <span className="px-2 py-0.5 bg-[#F4F0E8] text-[#5C5852] rounded-xs font-medium">
                Fit: {rev.fitFeedback}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1917]/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#FBF9F5] border border-[#E8E3D8] shadow-2xl p-6 sm:p-8 rounded-xs relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-1 text-[#78746D] hover:text-[#1A1917]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-[#1A1917] mb-1">
              Share Your Client Experience
            </h3>
            <p className="text-xs text-[#78746D] mb-6">
              Your feedback guides fellow collectors and our Milan atelier team.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#5C5852] block mb-1">
                  Overall Rating
                </label>
                <div className="flex gap-2 text-[#5E1924]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewRating(s)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${s <= newRating ? 'fill-current' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#5C5852] block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vivienne S."
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full bg-white border border-[#D8D2C5] px-3 py-2 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#5C5852] block mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Extraordinary drape and touch"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-[#D8D2C5] px-3 py-2 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#5C5852] block mb-1">
                  Fit Advice
                </label>
                <select
                  value={newFit}
                  onChange={(e) => setNewFit(e.target.value as any)}
                  className="w-full bg-white border border-[#D8D2C5] px-3 py-2 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
                >
                  <option value="Runs Small">Runs Small</option>
                  <option value="True to Size">True to Size</option>
                  <option value="Runs Large">Runs Large</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#5C5852] block mb-1">
                  Your Review
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the fabric hand-feel, fit on body, and styling versatility..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-white border border-[#D8D2C5] px-3 py-2 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1A1917] hover:bg-[#5E1924] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
