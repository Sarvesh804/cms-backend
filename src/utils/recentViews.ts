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

  console.log(`User ${userId} viewed article ${articleId}`);
  console.log("Current store:", JSON.stringify(recentViewsStore));
};

const getRecent = (userId: number): number[] => {
  console.log("Fetching for user:", userId);
  console.log("Store contents:", JSON.stringify(recentViewsStore));
  return recentViewsStore[userId] || [];
};

export default {
  addView,
  getRecent,
};
