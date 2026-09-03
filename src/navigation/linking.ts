import type { LinkingOptions } from '@react-navigation/native';
import type { RootStackParamList } from './types';

/**
 * Deep-link configuration for the custom scheme + universal/App Links on the
 * web domain, e.g. jubileepraise://album/JEIM1071EN or https://jubileepraise.com/album.
 * Album share links (…/album?c=CODE) are handled by useShareDeepLinks, which
 * navigates to the album; React Navigation owns the path-style routes below.
 */
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['jubileepraise://', 'https://jubileepraise.com', 'https://www.jubileepraise.com'],
  config: {
    screens: {
      MainTabs: {
        screens: {
          HomeTab: 'home',
          BrowseTab: 'browse',
          SearchTab: 'search',
          PlaylistsTab: 'playlists',
        },
      },
      AlbumDetails: 'album/:albumId',
      ArtistDetails: 'artist/:artistId',
      MusicPlayer: 'player',
    },
  },
};
