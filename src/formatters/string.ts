export function normalizeSearchTerm(searchTerm: string) {
  return searchTerm.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function isSearchMatch(searchTerm: string, candidate: string) {
  return normalizeSearchTerm(candidate).includes(
    normalizeSearchTerm(searchTerm)
  );
}
