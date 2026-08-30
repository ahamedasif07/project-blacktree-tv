export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullScreen: boolean;
  playbackRate: number;
  quality: 'auto' | '360p' | '480p' | '720p' | '1080p' | '4K';
  isChatOpen: boolean;
}
