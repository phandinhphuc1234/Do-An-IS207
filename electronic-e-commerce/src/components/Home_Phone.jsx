// src/components/HeroSection.js
import { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";

// Lấy ảnh bìa của video từ YouTube
// Thay THUMBNAIL_URL bằng đường dẫn đến ảnh bìa của bạn nếu muốn
const YOUTUBE_VIDEO_ID = "MTtiyKc8f2g";
const THUMBNAIL_URL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;

// Icon Play tùy chỉnh
const CustomPlayIcon = () => (
  <div className="w-16 h-16 bg-black bg-opacity-40 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-60 transition-all">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-8 h-8 text-white ml-1"
    >
      <path
        fillRule="evenodd"
        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z"
        clipRule="evenodd"
      />
    </svg>
  </div>
);

export default function HeroSection() {
  const [showOverlay, setShowOverlay] = useState(true); // State để ẩn/hiện ảnh bìa
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const opts = {
    playerVars: {
      autoplay: 0,
      controls: 0,
      mute: 1,
      loop: 0,
      modestbranding: 1,
      rel: 0,
      iv_load_policy: 3,
    },
  };

  const handlePlayClick = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setShowOverlay(false); // Ẩn ảnh bìa
      setIsPlaying(true);
    }
  };

  // useEffect để lặp lại video
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        if (playerRef.current?.getCurrentTime) {
          const currentTime = playerRef.current.getCurrentTime();
          if (currentTime >= 29) {
            playerRef.current.seekTo(0);
          }
        }
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    // Ko nên để để div có chiều rộng full màn hình, over-flow hidden để
    <div className="relative h-[90vh] max-w-7xl mx-auto overflow-hidden flex items-center justify-center mt-20 px-4 md:px-8">
      {/* Video nền (sẽ bị che lúc đầu) */}
      <div className="absolute inset-0 z-0 rounded-1xl overflow-hidden">
        <YouTube
          videoId={YOUTUBE_VIDEO_ID}
          opts={opts}
          onReady={(event) => (playerRef.current = event.target)}
          className="absolute w-full h-full"
          iframeClassName="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.77vh] min-w-full -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Lớp ảnh bìa và nút Play tùy chỉnh */}
      {showOverlay && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer rounded-3xl overflow-hidden"
          onClick={handlePlayClick}
        >
          <img
            src={THUMBNAIL_URL}
            alt="Video Thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute">
            <CustomPlayIcon />
          </div>
        </div>
      )}

      {/* Nội dung chữ */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center px-4 pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
          Galaxy Z Fold7
        </h1>
        <p className="mt-2 text-xl md:text-2xl font-light mb-8 drop-shadow-md">
          Galaxy AI ✨
        </p>
        <div className="flex justify-center space-x-4 pointer-events-auto">
          <a
            href="#"
            className="text-sm border border-white px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            Learn More
          </a>
          <button className="text-sm bg-white text-black font-semibold px-7 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
