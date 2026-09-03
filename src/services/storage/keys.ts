/** Namespaced AsyncStorage keys. Keep all persisted keys here to avoid clashes. */
export const STORAGE_KEYS = {
  PERSIST_ROOT: 'jubileepraise:root',
  RECENT_SEARCHES: 'jubileepraise:recentSearches',
  AUTH_TOKEN: 'jubileepraise:authToken',
  /** Set once the user finishes the first-launch onboarding. */
  ONBOARDING_DONE: 'jubileepraise:onboardingDone',
  /** Catalog manifest is cached chunked (it exceeds Android's ~2 MB row limit). */
  CATALOG_MANIFEST_META: 'jubileepraise:catalogManifest:meta',
  CATALOG_MANIFEST_CHUNK: 'jubileepraise:catalogManifest:chunk:',
  /** Admin-managed mobile category config (small JSON; stale-while-revalidate). */
  MOBILE_CONFIG: 'jubileepraise:mobileConfig',
} as const;
