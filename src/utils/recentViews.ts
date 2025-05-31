const recentViewsStore: Record<number, number[]> = {};

const addView = (userId: number, articleId: number): void => {
  if (!recentViewsStore[userId]) {
    recentViewsStore[userId] = [];
  }

  const views = recentViewsStore[userId];

  const index = views.indexOf(articleId);
  if (index > -1) {
    views.splice(index, 1);
  }

  views.unshift(articleId);

  if (views.length > 5) {
    views.pop();
  }
};

const getRecent = (userId: number): number[] => {
  return recentViewsStore[userId] || [];
};

export default {
  addView,
  getRecent,
};
