// SRS logic: simplified SM-2 algorithm
export function calculateNextReview({ interval, easeFactor, rating }) {
  let newInterval = interval;
  let newEase = easeFactor;
  if (rating === "again") {
    newInterval = 1;
    newEase = Math.max(1.3, easeFactor - 0.2);
  } else if (rating === "good") {
    newInterval = Math.round(interval * easeFactor);
    newEase = easeFactor;
  } else if (rating === "easy") {
    newInterval = Math.round(interval * (easeFactor + 0.15));
    newEase = easeFactor + 0.15;
  }
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);
  return {
    interval: newInterval,
    easeFactor: newEase,
    nextReviewDate: nextReviewDate.toISOString(),
  };
}
