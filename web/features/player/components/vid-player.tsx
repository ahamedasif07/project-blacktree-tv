/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  AirPlayButton,
  CaptionButton,
  useActiveTextCues,
  useActiveTextTrack,
  Controls,
  FullscreenButton,
  GoogleCastButton,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Menu,
  MuteButton,
  Poster,
  Spinner,
  VolumeSlider,
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
  PictureInPicture,
  Settings,
  Volume1,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/player.store";

const CinematicControls = ({ title }: { title?: string }) => {
  const { isChatOpen, toggleChat } = usePlayerStore();

  return (
    <Controls.Root
      className={`absolute inset-0 z-50 flex flex-col justify-end gap-2 md:gap-4 transition-opacity duration-300 opacity-0 data-visible:opacity-100 ${
        isChatOpen ? "px-6  py-4" : "px-6 py-4 md:py-8 lg:py-12"
      }`}
    >
      {/* Middle Section: Typography */}
      <div className="flex flex-col gap-1 md:gap-2 items-start max-w-2xl pointer-events-none select-none">
        <h1 className="text-white text-lg md:text-2xl font-medium tracking-tighter uppercase leading-none">
          {title || "BEYOND THE STORY"}
        </h1>
      </div>
      {/* Bottom Section: Controls */}
      <div className="flex justify-between items-end w-full pointer-events-auto">
        {/* Sound Control Group */}
        <div className="flex items-center gap-2 md:gap-4 group/volume">
          <MuteButton className="group ring-sky-400 relative inline-flex px-2 h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-indigo-400">
            <VolumeOff className="w-4 h-4 md:w-5 md:h-5 hidden group-data-[state='muted']:block" />
            <Volume1 className="w-4 h-4 md:w-5 md:h-5 hidden group-data-[state='low']:block" />
            <Volume2 className="w-4 h-4 md:w-5 md:h-5 hidden group-data-[state='high']:block" />
          </MuteButton>

          <VolumeSlider.Root className="group relative mx-[7.5px] hidden md:inline-flex h-10 w-full min-w-20 cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
            <VolumeSlider.Track className="relative ring-sky-400 z-0 h-1.25 w-full rounded-sm bg-white/30 group-data-focus:ring-[3px]">
              <VolumeSlider.TrackFill className="bg-indigo-400 absolute h-full w-(--slider-fill) rounded-sm will-change-[width]" />
            </VolumeSlider.Track>

            <VolumeSlider.Preview
              className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-visible:opacity-100 pointer-events-none"
              noClamp
            >
              <VolumeSlider.Value className="rounded-sm bg-black px-2 py-px text-[13px] font-medium text-white" />
            </VolumeSlider.Preview>

            <VolumeSlider.Thumb className="absolute left-(--slider-fill) top-1/2 z-20 h-3.75 w-3.75 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity group-data-active:opacity-100 group-data-dragging:ring-4 will-change-[left]" />
          </VolumeSlider.Root>
        </div>

        {/* Right Action Group */}
        <div className="flex items-center gap-2 md:gap-6">
          <div className="flex items-center gap-1.5 md:gap-4 text-white/70">
            <AirPlayButton className="aria-hidden:hidden group ring-sky-400 relative inline-flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-indigo-400">
              <Airplay className="w-5 h-5" />
            </AirPlayButton>
            <GoogleCastButton className="aria-hidden:hidden group ring-sky-400 relative inline-flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-indigo-400">
              <Cast className="w-5 h-5" />
            </GoogleCastButton>
            <CaptionButton className="aria-hidden:hidden group ring-sky-400 relative inline-flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-indigo-400">
              <CaptionsOff className="w-5 h-5 md:w-6 md:h-6 hidden group-data-active:block" />
              <CaptionsIcon className="w-5 h-5 md:w-6 md:h-6 group-data-active:hidden" />
            </CaptionButton>
            <FullscreenButton className="aria-hidden:hidden group ring-sky-400 relative inline-flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-indigo-400">
              <Maximize className="w-4 h-4 md:w-5 md:h-5 group-data-active:hidden" />
              <Minimize className="w-4 h-4 md:w-5 md:h-5 hidden group-data-active:block" />
            </FullscreenButton>

            {!useMediaState("fullscreen") && (
              <button
                onClick={toggleChat}
                className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-indigo-400 p-1"
                aria-label="Toggle Chat"
              >
                {isChatOpen ? (
                  <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <MessageSquareOff className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>
            )}

            <Menu.Root>
              <Menu.Button
                className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-indigo-400 p-1"
                aria-label="Settings"
              >
                <Settings className="h-4 md:h-5 md:w-5 transform transition-transform duration-200 ease-out group-data-open:rotate-90" />
              </Menu.Button>
              <Menu.Items
                className="animate-out fade-out slide-out-to-bottom-2 data-open:animate-in data-open:fade-in data-open:slide-in-from-bottom-4 flex h-(--menu-height) max-h-100 min-w-65 flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-black/95 p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] data-resizing:overflow-hidden"
                placement="top"
                offset={0}
              >
                <div className="flex flex-col gap-1">
                  <div className="px-2.5 pb-2 text-xs font-bold uppercase tracking-widest text-white/40">
                    Settings
                  </div>

                  {/* Quality Submenu */}
                  <QualitySubmenu />

                  {/* Speed Submenu */}
                  <SpeedSubmenu />

                  {/* Captions Submenu */}
                  <CaptionsSubmenu />
                </div>
              </Menu.Items>
            </Menu.Root>
          </div>
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
  const provider = video.provider?.toLowerCase();
  const url = video.videoUrl || "";

  if (provider === "youtube") {
    // If the videoUrl is just the 11-character video ID, use 'youtube/VIDEO_ID' for Vidstack
    if (url.length === 11 && !url.includes("/")) {
      return `youtube/${url}`;
    }
    return url;
  }

  if (provider === "cloudflare") {
    if (url.includes("cloudflarestream.com") && url.endsWith("/watch")) {
      return url.replace(/\/watch$/, "/manifest/video.m3u8");
    }
    return url;
  }

  return url;
};

const getPosterUrl = (video: any) => {
  if (!video) return undefined;
  const provider = video.provider?.toLowerCase();
  const url = video.videoUrl || "";

  if (provider === "youtube") {
    let videoId = url;
    if (url.includes("/")) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      videoId = match && match[2] && match[2].length === 11 ? match[2] : url;
    }
    // hqdefault.jpg is guaranteed to exist for all YouTube videos, preventing 404 logs
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
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
          // Ignore state updates from the player during source transitions to prevent overwriting stored preference
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

  // Fetch videos from the API
  const { data, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await fetch("/api/video?limit=100");
      if (!res.ok) throw new Error("Failed to fetch videos");
      return res.json();
    },
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false, 
  });

  const videos = data?.data || [];

  useEffect(() => {
    if (data?.serverTime) {
      clockOffsetRef.current = data.serverTime - Date.now();
    }
  }, [data]);

  // Update active video in store based on synchronized epoch time when videos load
  useEffect(() => {
    if (videos.length > 0 && !activeVideo) {
      const totalDuration = videos.reduce(
        (acc: number, v: any) => acc + (v.size || 0),
        0,
      );
      if (totalDuration > 0) {
        const syncNow = Math.floor(
          (Date.now() + clockOffsetRef.current) / 1000,
        );
        const cycleOffset = syncNow % totalDuration;

        let accumulatedTime = 0;
        let expectedVideo = videos[0];

        for (const video of videos) {
          const duration = video.size || 0;
          if (
            cycleOffset >= accumulatedTime &&
            cycleOffset < accumulatedTime + duration
          ) {
            expectedVideo = video;
            break;
          }
          accumulatedTime += duration;
        }

        setActiveVideo(expectedVideo);
        // Silently sync the URL as well
        const newUrl = `${window.location.pathname}?v=${expectedVideo.id}`;
        window.history.replaceState(
          { ...window.history.state, as: newUrl, url: newUrl },
          "",
          newUrl,
        );
      } else {
        setActiveVideo(videos[0]);
      }
    }
  }, [videos, activeVideo, setActiveVideo]);

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

  const syncPlayback = () => {
    if (!playerInstanceRef.current || videos.length === 0) return;

    const totalDuration = videos.reduce(
      (acc: number, v: any) => acc + (v.size || 0),
      0,
    );
    if (totalDuration === 0) return;

    const syncNow = Math.floor((Date.now() + clockOffsetRef.current) / 1000);
    const cycleOffset = syncNow % totalDuration;

    let accumulatedTime = 0;
    let expectedVideo = videos[0];
    let expectedSeekOffset = 0;

    for (const video of videos) {
      const duration = video.size || 0;
      if (
        cycleOffset >= accumulatedTime &&
        cycleOffset < accumulatedTime + duration
      ) {
        expectedVideo = video;
        expectedSeekOffset = cycleOffset - accumulatedTime;
        break;
      }
      accumulatedTime += duration;
    }

    // 1. If expected video is different from the current active video, transition to it
    if (activeVideo && expectedVideo.id !== activeVideo.id) {
      console.log(
        "Sync: Switching video to stay in sync with broadcast:",
        expectedVideo.title,
      );
      setActiveVideo(expectedVideo);
      // Update address bar silently
      const newUrl = `${window.location.pathname}?v=${expectedVideo.id}`;
      window.history.replaceState(
        { ...window.history.state, as: newUrl, url: newUrl },
        "",
        newUrl,
      );
      initialSeekDone.current = false; // Trigger seek when new video becomes ready
      return;
    }

    // Only perform drift checking/seeking if initial sync seek has completed
    if (!initialSeekDone.current) return;

    // 2. If it's the correct video, check if playback position is in sync (within 3 seconds threshold)
    const currentPlayerTime = playerInstanceRef.current.currentTime;
    const timeDifference = Math.abs(currentPlayerTime - expectedSeekOffset);

    if (timeDifference > 3) {
      console.log(
        `Sync: Player is out of sync by ${timeDifference.toFixed(1)}s. Seeking to ${expectedSeekOffset.toFixed(1)}s.`,
      );
      playerInstanceRef.current.currentTime = expectedSeekOffset;
    }
  };

  // Run periodic self-healing sync check
  useEffect(() => {
    if (videos.length === 0 || !activeVideo) return;

    // Run initial sync check immediately
    syncPlayback();

    const interval = setInterval(() => {
      syncPlayback();
    }, 10000); // Check sync every 10 seconds

    return () => clearInterval(interval);
  }, [videos, activeVideo]);

  // Handle video ending to play the next one (continuous stream)
  const handleEnded = () => {
    if (videos.length > 0 && activeVideo) {
      const currentIndex = videos.findIndex(
        (v: any) => v.id === activeVideo.id,
      );
      const nextIndex = (currentIndex + 1) % videos.length; // Loop back to the first video
      const nextVideo = videos[nextIndex];

      if (nextVideo) {
        // 1. Instantly update Zustand store to change the player source and meta in-place (no remount/reload)
        setActiveVideo(nextVideo);

        // 2. Silently update the address bar URL without triggering Next.js router re-rendering
        const newUrl = `${window.location.pathname}?v=${nextVideo.id}`;
        window.history.replaceState(
          { ...window.history.state, as: newUrl, url: newUrl },
          "",
          newUrl,
        );
      }
    }
  };

  // Perform synchronized seek as soon as the media can play
  const handleCanPlay = () => {
    if (
      !initialSeekDone.current &&
      playerInstanceRef.current &&
      videos.length > 0
    ) {
      // Restore muted and volume states from the store to prevent default/autoplay resets
      const store = usePlayerStore.getState();
      playerInstanceRef.current.muted = store.isMuted;
      playerInstanceRef.current.volume = store.volume;

      const totalDuration = videos.reduce(
        (acc: number, v: any) => acc + (v.size || 0),
        0,
      );
      if (totalDuration > 0) {
        const syncNow = Math.floor(
          (Date.now() + clockOffsetRef.current) / 1000,
        );
        const cycleOffset = syncNow % totalDuration;

        let accumulatedTime = 0;
        let expectedSeekOffset = 0;

        for (const video of videos) {
          const duration = video.size || 0;
          if (
            cycleOffset >= accumulatedTime &&
            cycleOffset < accumulatedTime + duration
          ) {
            expectedSeekOffset = cycleOffset - accumulatedTime;
            break;
          }
          accumulatedTime += duration;
        }

        // Only seek if the expected seek offset is valid and within the video duration
        if (
          expectedSeekOffset > 0 &&
          expectedSeekOffset < (activeVideo?.size || Infinity)
        ) {
          console.log("CanPlay Sync: Initial seek to:", expectedSeekOffset);
          playerInstanceRef.current.currentTime = expectedSeekOffset;
        }
      }
      initialSeekDone.current = true;
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
      streamType="live"
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

      <CinematicControls title={activeVideo.title} />

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
