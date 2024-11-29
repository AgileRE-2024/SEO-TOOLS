export function formatTrends(keywords) {
  return keywords
    .map((keyword) => ({
      title: { query: keyword.keyword },
      accessedAt: keyword.accessedAt,
    }))
    .sort((a, b) => new Date(b.accessedAt) - new Date(a.accessedAt))
    .map((keyword) => ({
      ...keyword,
      accessedAt: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date(keyword.accessedAt)),
    }));
}
