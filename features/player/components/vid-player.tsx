/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  AirPlayButton,
  CaptionButton,
  Controls,
  FullscreenButton,
  GoogleCastButton,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Menu,
  MuteButton,
  PIPButton,
  PlayButton,
  Poster,
  SeekButton,
  Spinner,
  Time,
  TimeSlider,
  VolumeSlider,
  useActiveTextCues,
  useActiveTextTrack,
  useCaptionOptions,
  useMediaState,
  usePlaybackRateOptions,
  useVideoQualityOptions,
} from "@vidstack/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RadioButtonIcon,
  RadioButtonSelectedIcon,
} from "@vidstack/react/icons";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/captions.css";
import {
  Airplay,
  Captions as CaptionsIcon,
  CaptionsOff,
  Cast,
  Gauge,
  LucideIcon,
  Maximize,
  MessageSquare,
  MessageSquareOff,
  Minimize,
  Pause,
  PictureInPicture,
  Play,
  RotateCcw,
  RotateCw,
  Settings,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/player.store";
import { FRONTEND_VIDEOS } from "../data/videos";

interface CinematicControlsProps {
  title?: string;
  onNext?: () => void;
  onPrev?: () => void;
}

const CinematicControls = ({ title, onNext, onPrev }: CinematicControlsProps) => {
  const { isChatOpen, toggleChat } = usePlayerStore();

  return (
    <Controls.Root
      className={`absolute inset-0 z-50 flex flex-col justify-end gap-2 md:gap-3 transition-opacity duration-300 opacity-0 data-visible:opacity-100 bg-gradient-to-t from-black/90 via-black/40 to-transparent ${
        isChatOpen ? "px-4 py-3 md:px-6 md:py-4" : "px-4 py-3 md:px-6 md:py-6"
      }`}
    >
      {/* Middle Section: Typography */}
      <div className="flex flex-col gap-1 items-start max-w-2xl pointer-events-none select-none px-1">
        <h1 className="text-white text-base md:text-xl font-semibold tracking-tight uppercase leading-tight line-clamp-1 drop-shadow-md">
          {title || "MARVEL CINEMATIC FEATURE"}
        </h1>
      </div>

      {/* Progress / Time Seek Bar */}
      <div className="w-full pointer-events-auto px-1">
        <TimeSlider.Root className="time-slider group relative inline-flex h-6 w-full cursor-pointer touch-none select-none items-center outline-none">
          <TimeSlider.Track className="relative ring-sky-400 z-0 h-1 md:h-1.5 w-full rounded-sm bg-white/30 group-data-focus:ring-[3px] group-hover:h-2 transition-all">
            <TimeSlider.TrackFill className="bg-primary absolute h-full w-(--slider-fill) rounded-sm will-change-[width]" />
            <TimeSlider.Progress className="bg-white/40 absolute h-full w-(--slider-progress) rounded-sm will-change-[width]" />
          </TimeSlider.Track>

          <TimeSlider.Thumb className="absolute left-(--slider-fill) top-1/2 z-20 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-primary opacity-0 ring-white/40 transition-opacity group-data-active:opacity-100 group-hover:opacity-100 will-change-[left]" />

          <TimeSlider.Preview className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-visible:opacity-100 pointer-events-none">
            <TimeSlider.Value className="rounded-sm bg-black/95 border border-white/10 px-2 py-0.5 text-xs font-mono text-white shadow-lg" />
          </TimeSlider.Preview>
        </TimeSlider.Root>
      </div>

      {/* Bottom Section: Controls */}
      <div className="flex justify-between items-center w-full pointer-events-auto px-1">
        {/* Left Control Group (Playback & Audio) */}
        <div className="flex items-center gap-1.5 md:gap-3 text-white">
          {/* Play / Pause Button */}
          <PlayButton
            className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-primary transition-colors"
            aria-label="Play / Pause"
          >
            <Play className="w-4 h-4 md:w-5 md:h-5 fill-current hidden group-data-[paused]:block" />
            <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current block group-data-[paused]:hidden" />
          </PlayButton>

          {/* Previous Video Button */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-primary transition-colors"
              aria-label="Previous Video"
              title="Previous Video"
            >
              <SkipBack className="w-4 h-4 md:w-5 md:h-5 fill-current" />
            </button>
          )}

          {/* 10s Rewind Button */}
          <SeekButton
            seconds={-10}
            className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-primary transition-colors"
            aria-label="Rewind 10 seconds"
            title="Rewind 10s"
          >
            <RotateCcw className="w-4 h-4 md:w-4.5 md:h-4.5" />
          </SeekButton>

          {/* 10s Fast Forward Button */}
          <SeekButton
            seconds={10}
            className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-primary transition-colors"
            aria-label="Forward 10 seconds"
            title="Forward 10s"
          >
            <RotateCw className="w-4 h-4 md:w-4.5 md:h-4.5" />
          </SeekButton>

          {/* Next Video Button */}
          {onNext && (
            <button
              onClick={onNext}
              className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-primary transition-colors"
              aria-label="Next Video"
              title="Next Video"
            >
              <SkipForward className="w-4 h-4 md:w-5 md:h-5 fill-current" />
            </button>
          )}

          {/* Sound Control Group */}
          <div className="flex items-center gap-1 md:gap-2 group/volume ml-1">
            <MuteButton className="group ring-sky-400 relative inline-flex px-1.5 h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-primary transition-colors">
              <VolumeOff className="w-4 h-4 md:w-5 md:h-5 hidden group-data-[state='muted']:block text-red-400" />
              <Volume1 className="w-4 h-4 md:w-5 md:h-5 hidden group-data-[state='low']:block" />
              <Volume2 className="w-4 h-4 md:w-5 md:h-5 hidden group-data-[state='high']:block" />
            </MuteButton>

            <VolumeSlider.Root className="group relative mx-1 hidden sm:inline-flex h-8 w-16 md:w-20 cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
              <VolumeSlider.Track className="relative ring-sky-400 z-0 h-1 md:h-1.25 w-full rounded-sm bg-white/30 group-data-focus:ring-[3px]">
                <VolumeSlider.TrackFill className="bg-primary absolute h-full w-(--slider-fill) rounded-sm will-change-[width]" />
              </VolumeSlider.Track>

              <VolumeSlider.Preview
                className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-visible:opacity-100 pointer-events-none"
                noClamp
              >
                <VolumeSlider.Value className="rounded-sm bg-black px-2 py-px text-[11px] font-medium text-white" />
              </VolumeSlider.Preview>

              <VolumeSlider.Thumb className="absolute left-(--slider-fill) top-1/2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-primary opacity-0 ring-white/40 transition-opacity group-data-active:opacity-100 group-data-dragging:ring-4 will-change-[left]" />
            </VolumeSlider.Root>
          </div>

          {/* Time Elapsed / Duration Display */}
          <div className="flex items-center gap-1 text-[11px] md:text-xs font-mono text-white/80 select-none ml-1">
            <Time className="time font-medium" type="current" />
            <span className="text-white/40">/</span>
            <Time className="time font-medium text-white/60" type="duration" />
          </div>
        </div>

        {/* Right Action Group */}
        <div className="flex items-center gap-1 md:gap-3 text-white/80">
          {/* Picture-in-Picture Button */}
          <PIPButton
            className="aria-hidden:hidden group ring-sky-400 relative inline-flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-primary transition-colors"
            aria-label="Picture in Picture"
            title="Picture in Picture"
          >
            <PictureInPicture className="w-4 h-4 md:w-4.5 md:h-4.5" />
          </PIPButton>

          {/* Airplay Button */}
          <AirPlayButton
            className="aria-hidden:hidden group ring-sky-400 relative inline-flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-primary transition-colors"
            title="AirPlay"
          >
            <Airplay className="w-4 h-4 md:w-4.5 md:h-4.5" />
          </AirPlayButton>

          {/* Google Cast Button */}
          <GoogleCastButton
            className="aria-hidden:hidden group ring-sky-400 relative inline-flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-primary transition-colors"
            title="Cast"
          >
            <Cast className="w-4 h-4 md:w-4.5 md:h-4.5" />
          </GoogleCastButton>

          {/* Captions Button */}
          <CaptionButton
            className="aria-hidden:hidden group ring-sky-400 relative inline-flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-primary transition-colors"
            title="Captions"
          >
            <CaptionsOff className="w-4 h-4 md:w-5 md:h-5 hidden group-data-active:block" />
            <CaptionsIcon className="w-4 h-4 md:w-5 md:h-5 group-data-active:hidden" />
          </CaptionButton>

          {/* Fullscreen Button */}
          <FullscreenButton
            className="aria-hidden:hidden group ring-sky-400 relative inline-flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-primary transition-colors"
            title="Fullscreen"
          >
            <Maximize className="w-4 h-4 md:w-4.5 md:h-4.5 group-data-active:hidden" />
            <Minimize className="w-4 h-4 md:w-4.5 md:h-4.5 hidden group-data-active:block" />
          </FullscreenButton>

          {/* Chat Toggle Button (when not fullscreen) */}
          {!useMediaState("fullscreen") && (
            <button
              onClick={toggleChat}
              className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-primary transition-colors"
              aria-label="Toggle Chat"
              title={isChatOpen ? "Close Chat" : "Open Chat"}
            >
              {isChatOpen ? (
                <MessageSquare className="w-4 h-4 md:w-4.5 md:h-4.5" />
              ) : (
                <MessageSquareOff className="w-4 h-4 md:w-4.5 md:h-4.5" />
              )}
            </button>
          )}

          {/* Settings Menu (Speed, Quality, Captions) */}
          <Menu.Root>
            <Menu.Button
              className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-primary transition-colors"
              aria-label="Settings"
              title="Settings (Speed & Quality)"
            >
              <Settings className="h-4 w-4 md:h-4.5 md:w-4.5 transform transition-transform duration-200 ease-out group-data-open:rotate-90" />
            </Menu.Button>
            <Menu.Items
              className="animate-out fade-out slide-out-to-bottom-2 data-open:animate-in data-open:fade-in data-open:slide-in-from-bottom-4 flex h-(--menu-height) max-h-100 min-w-65 flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-black/95 p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] data-resizing:overflow-hidden shadow-2xl"
              placement="top"
              offset={0}
            >
              <div className="flex flex-col gap-1">
                <div className="px-2.5 pb-2 text-xs font-bold uppercase tracking-widest text-white/40">
                  Settings
                </div>

                {/* Speed Submenu */}
                <SpeedSubmenu />

                {/* Quality Submenu */}
                <QualitySubmenu />

                {/* Captions Submenu */}
                <CaptionsSubmenu />
              </div>
            </Menu.Items>
          </Menu.Root>
        </div>
      </div>
    </Controls.Root>
  );
};

function CaptionsSubmenu() {
  const options = useCaptionOptions(),
    hint = options.selectedTrack?.label ?? "Default";
  return (
    <Menu.Root>
      <SubmenuButton
        label="Captions"
        hint={hint}
        disabled={options.disabled}
        icon={CaptionsOff}
      />
      <Menu.Content className={submenuClassName}>
        <Menu.RadioGroup
          className="w-full flex flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }, index) => (
            <Menu.Radio
              className={radioClassName}
              value={value}
              onSelect={select}
              key={`${value}-${index}`}
            >
              <RadioButtonIcon className={radioIconClassName} />
              <RadioButtonSelectedIcon className={radioSelectedIconClassName} />
              {label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

// Re-use styles across submenus.
const submenuClassName =
    "hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[3px] data-[open]:inline-block",
  radioClassName =
    "ring-sky-400 group relative flex w-full gap-1 cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none data-[hocus]:bg-white/10 data-[focus]:ring-[3px]",
  radioIconClassName = "h-4 w-4 text-white group-data-[checked]:hidden",
  radioSelectedIconClassName =
    "text-indigo-400 hidden h-4 w-4 group-data-[checked]:block";

function SpeedSubmenu() {
  const options = usePlaybackRateOptions(),
    hint =
      options.selectedValue === "1" ? "Normal" : options.selectedValue + "x";
  return (
    <Menu.Root>
      <SubmenuButton
        label="Speed"
        hint={hint}
        disabled={options.disabled}
        icon={Gauge}
      />
      <Menu.Content className={submenuClassName}>
        <Menu.RadioGroup
          className="w-full flex flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }, index) => (
            <Menu.Radio
              className={radioClassName}
              value={value}
              onSelect={select}
              key={`${value}-${index}`}
            >
              <RadioButtonIcon className={radioIconClassName} />
              <RadioButtonSelectedIcon className={radioSelectedIconClassName} />
              {label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

function QualitySubmenu() {
  const options = useVideoQualityOptions(),
    currentQuality = options.selectedQuality?.height,
    hint =
      options.selectedValue !== "auto" && currentQuality
        ? `${currentQuality}p`
        : `Auto${currentQuality ? ` (${currentQuality}p)` : ""}`;
  return (
    <Menu.Root>
      <SubmenuButton
        label="Quality"
        hint={hint}
        disabled={options.disabled}
        icon={Settings}
      />
      <Menu.Content className={submenuClassName}>
        <Menu.RadioGroup
          className="w-full flex flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, bitrateText, select }, index) => (
            <Menu.Radio
              className={radioClassName}
              value={value}
              onSelect={select}
              key={`${value}-${index}`}
            >
              <RadioButtonIcon className={radioIconClassName} />
              <RadioButtonSelectedIcon className={radioSelectedIconClassName} />
              {label}
              {bitrateText ? (
                <span className="text-[13px] text-gray-300 ml-auto">
                  {bitrateText}
                </span>
              ) : null}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

interface SubmenuButtonProps {
  label: string;
  hint: string;
  disabled?: boolean;
  icon: LucideIcon;
}

function SubmenuButton({
  label,
  hint,
  icon: Icon,
  disabled,
}: SubmenuButtonProps) {
  return (
    <Menu.Button
      className="ring-sky-400 parent left-0 z-10 flex w-full cursor-pointer select-none items-center justify-start rounded-sm bg-black/60 p-2.5 outline-none ring-inset data-open:sticky data-open:-top-2.5 data-hocus:bg-white/10 data-focus:ring-[3px] disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      <ChevronLeftIcon className="parent-data-[open]:block -ml-0.5 mr-1.5 hidden h-4.5 w-4.5" />
      <Icon className="w-5 h-5 parent-data-[open]:hidden" />
      <span className="ml-1.5 parent-data-[open]:ml-0">{label}</span>
      <span className="ml-auto text-sm text-white/50">{hint}</span>
      <ChevronRightIcon className="parent-data-[open]:hidden ml-0.5 h-4.5 w-4.5 text-sm text-white/50" />
    </Menu.Button>
  );
}

const getStreamUrl = (video: any) => {
  if (!video) return "";
  const provider = (video.provider || video.platform || "")?.toLowerCase();
  const url = video.videoUrl || "";

  if (provider === "youtube" || url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = url;
    if (url.includes("/")) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      videoId = match && match[2] && match[2].length === 11 ? match[2] : url;
    }
    return `youtube/${videoId}`;
  }

  if (provider === "cloudflare" || url.includes("cloudflarestream.com")) {
    if (url.endsWith("/watch")) {
      return url.replace(/\/watch$/, "/manifest/video.m3u8");
    }
    return url;
  }

  return url;
};

const getPosterUrl = (video: any) => {
  if (!video) return undefined;
  const provider = (video.provider || video.platform || "")?.toLowerCase();
  const url = video.videoUrl || "";

  if (provider === "youtube" || url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = url;
    if (url.includes("/")) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      videoId = match && match[2] && match[2].length === 11 ? match[2] : url;
    }
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  if (provider === "cloudflare" || url.includes("cloudflarestream.com")) {
    const match = url.match(/cloudflarestream\.com\/([a-zA-Z0-9]+)/);
    if (match && match[1]) {
      return `https://customer-nlwo0ik8gfher2ji.cloudflarestream.com/${match[1]}/thumbnails/thumbnail.jpg`;
    }
  }

  return undefined;
};

const VidPlayer = () => {
  const {
    isChatOpen,
    activeVideo,
    setActiveVideo,
    isMuted,
    volume,
    setMuted,
    setVolume,
  } = usePlayerStore();
  const searchParams = useSearchParams();
  const videoId = searchParams.get("v") || searchParams.get("video");

  const playerInstanceRef = useRef<MediaPlayerInstance | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const clockOffsetRef = useRef<number>(0);
  const initialSeekDone = useRef(false);

  const onPlayerRef = (instance: MediaPlayerInstance | null) => {
    playerInstanceRef.current = instance;
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    if (instance) {
      unsubscribeRef.current = instance.subscribe(
        ({ volume: newVolume, muted: newMuted }) => {
          if (!initialSeekDone.current) return;

          const store = usePlayerStore.getState();
          if (store.volume !== newVolume) {
            store.setVolume(newVolume);
          }
          if (store.isMuted !== newMuted) {
            store.setMuted(newMuted);
          }
        },
      );
    }
  };

  // Directly use frontend Marvel video list (100% standalone frontend)
  const videos = FRONTEND_VIDEOS;
  const isLoading = false;

  // Set default active video on initial load if none active
  useEffect(() => {
    if (videos.length > 0 && !activeVideo) {
      const selected = videoId
        ? videos.find((v) => v.id === videoId) || videos[0]
        : videos[0];
      setActiveVideo(selected);
    }
  }, [videos, activeVideo, setActiveVideo, videoId]);

  // Reset initial seek state and clear existing text tracks when activeVideo changes
  useEffect(() => {
    initialSeekDone.current = false;
    if (playerInstanceRef.current) {
      try {
        playerInstanceRef.current.textTracks.clear();
      } catch (err) {
        console.warn("Failed to clear text tracks on video change:", err);
      }
    }
  }, [activeVideo?.id]);

  // Handle video ending to play the next one (continuous playlist loop)
  const handleEnded = () => {
    if (videos.length > 0 && activeVideo) {
      const currentIndex = videos.findIndex(
        (v: any) => v.id === activeVideo.id,
      );
      const nextIndex = (currentIndex + 1) % videos.length; // Advance to next video (or loop back to first)
      const nextVideo = videos[nextIndex];

      if (nextVideo) {
        // Instantly update Zustand store to change the player source to next video
        setActiveVideo(nextVideo);

        // Silently update address bar URL
        const newUrl = `${window.location.pathname}?v=${nextVideo.id}`;
        window.history.replaceState(
          { ...window.history.state, as: newUrl, url: newUrl },
          "",
          newUrl,
        );
      }
    }
  };

  // Perform setup as soon as the media is ready
  const handleCanPlay = () => {
    if (playerInstanceRef.current) {
      const store = usePlayerStore.getState();
      playerInstanceRef.current.muted = store.isMuted;
      playerInstanceRef.current.volume = store.volume;
      playerInstanceRef.current.play().catch(() => {});
    }
  };

  // Advance to next video
  const handleNext = () => {
    if (videos.length > 0 && activeVideo) {
      const currentIndex = videos.findIndex(
        (v: any) => v.id === activeVideo.id,
      );
      const nextIndex = (currentIndex + 1) % videos.length;
      const nextVideo = videos[nextIndex];
      if (nextVideo) {
        setActiveVideo(nextVideo);
        const newUrl = `${window.location.pathname}?v=${nextVideo.id}`;
        window.history.replaceState(
          { ...window.history.state, as: newUrl, url: newUrl },
          "",
          newUrl,
        );
      }
    }
  };

  // Back to previous video
  const handlePrev = () => {
    if (videos.length > 0 && activeVideo) {
      const currentIndex = videos.findIndex(
        (v: any) => v.id === activeVideo.id,
      );
      const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
      const prevVideo = videos[prevIndex];
      if (prevVideo) {
        setActiveVideo(prevVideo);
        const newUrl = `${window.location.pathname}?v=${prevVideo.id}`;
        window.history.replaceState(
          { ...window.history.state, as: newUrl, url: newUrl },
          "",
          newUrl,
        );
      }
    }
  };

  // Loading state
  if (isLoading || !activeVideo) {
    return (
      <div className="w-full aspect-video bg-zinc-950 flex items-center justify-center rounded-xl border border-white/5">
        <div className="flex flex-col items-center gap-3">
          <Spinner.Root className="text-indigo-500 animate-spin" size={40}>
            <Spinner.Track className="opacity-25" width={4} />
            <Spinner.TrackFill className="opacity-75" width={4} />
          </Spinner.Root>
          <span className="text-xs text-zinc-500 font-medium">
            Loading player...
          </span>
        </div>
      </div>
    );
  }

  const videoSrc = getStreamUrl(activeVideo);
  const videoTitle = activeVideo.title;
  const posterSrc = getPosterUrl(activeVideo);

  return (
    <MediaPlayer
      ref={onPlayerRef}
      title={videoTitle}
      src={videoSrc}
      crossOrigin="anonymous"
      playsInline
      logLevel="silent"
      viewType="video"
      streamType="on-demand"
      autoPlay
      muted={isMuted}
      volume={volume}
      googleCast={{
        receiverApplicationId: "CC1AD845",
      }}
      onOrientationChange={undefined}
      onEnded={handleEnded}
      onCanPlay={handleCanPlay}
      onLoadStart={() => {
        if (playerInstanceRef.current) {
          try {
            playerInstanceRef.current.textTracks.clear();
          } catch (err) {
            console.warn("Failed to clear text tracks on load start:", err);
          }
        }
      }}
      keyShortcuts={{
        togglePaused: {
          keys: ["k", "Space"],
          onKeyDown({ event }) {
            event.preventDefault();
          },
        },
        seekBackward: [],
        seekForward: [],
      }}
      className="w-full aspect-video bg-black overflow-hidden rounded-xl shadow-2xl group/player data-fullscreen:rounded-none data-fullscreen:aspect-auto data-fullscreen:h-full transition-all duration-300"
    >
      <MediaProvider>
        <Poster
          src={posterSrc}
          className="absolute inset-0 w-full h-full object-cover opacity-0 data-visible:opacity-100 transition-opacity duration-300"
        />
      </MediaProvider>

      <CustomCaptions />

      {/* Permanent Overlay: Always Visible */}
      <div
        className={`absolute z-10 transition-all duration-300 pointer-events-none ${
          isChatOpen
            ? "top-4 right-4 lg:top-8 lg:right-8"
            : "top-6 right-6 lg:top-12 lg:right-12"
        }`}
      >
        <div className="flex items-center gap-2 bg-primary px-3 py-1.5 rounded-md shadow-[0_0_20px_rgba(var(--primary),0.4)] border border-white/10">
          <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
          <span className="text-primary-foreground text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-none">
            LIVE
          </span>
        </div>
      </div>

      <CinematicControls
        title={activeVideo.title}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      <BufferingIndicator />
    </MediaPlayer>
  );
};

export default VidPlayer;

function BufferingIndicator() {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 flex h-full w-full items-center justify-center">
      <Spinner.Root
        className="text-white opacity-0 transition-opacity duration-200 ease-linear media-buffering:animate-spin media-buffering:opacity-100"
        size={84}
      >
        <Spinner.Track className="opacity-25" width={8} />
        <Spinner.TrackFill className="opacity-75" width={8} />
      </Spinner.Root>
    </div>
  );
}

function CustomCaptions() {
  const activeCaptions = useActiveTextTrack("captions");
  const activeSubtitles = useActiveTextTrack("subtitles");
  const track = activeCaptions || activeSubtitles;
  const cues = useActiveTextCues(track);

  if (!cues || cues.length === 0) return null;

  // De-duplicate cues by their text content
  const uniqueCues: string[] = [];
  for (const cue of cues) {
    const text = cue.text.replace(/<[^>]*>/g, "").trim();
    if (text && !uniqueCues.includes(text)) {
      uniqueCues.push(text);
    }
  }

  if (uniqueCues.length === 0) return null;

  return (
    <div className="media-captions absolute inset-x-0 bottom-6 z-50 pointer-events-none flex flex-col items-center px-4">
      <div className="flex flex-col gap-2 items-center max-w-2xl text-center">
        {uniqueCues.map((text, idx) => (
          <span
            key={idx}
            className="bg-black/80 text-white font-sans text-sm md:text-base lg:text-lg font-medium px-4 py-1.5 rounded shadow-lg whitespace-pre-line border border-white/5"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
