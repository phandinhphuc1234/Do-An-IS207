import { useEffect, useRef } from "react";

const YOUTUBE_VIDEO_ID = "ePdbj2bZ-Ro";
const LOOP_AT_SECONDS = 60; // Loop at 1:06

const HeroSection = () => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("hero-youtube-player", {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
          showinfo: 0,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
        },
      });
    };

    // If API already loaded
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }

    // Check time and loop
    const interval = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime();
        if (currentTime >= LOOP_AT_SECONDS) {
          playerRef.current.seekTo(0);
        }
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* YouTube Player Container */}
      <div className="absolute inset-0" ref={containerRef}>
        <div
          id="hero-youtube-player"
          className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative flex flex-col items-center justify-center h-full text-white text-center z-10">
        <div className="mb-40 space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
            Galaxy Event
          </h1>
          <p className="text-xl md:text-2xl font-normal">
            Oct. 21, 2025 at 10:00 PM EDT
          </p>
          <p className="text-xl md:text-2xl font-normal pb-4">
            Live on Samsung.com
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-black font-semibold text-base rounded-full hover:bg-gray-200 transition-colors shadow-lg">
            Reserve now
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-5 left-5 text-white/50 z-20">
        <span className="text-2xl opacity-50">&copy;</span>
      </div>

      {/* Feedback */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 -rotate-90 origin-bottom-right p-2 bg-gray-700/80 text-white text-xs font-medium cursor-pointer z-20">
        FEEDBACK
      </div>
    </div>
  );
};

export default HeroSection;
