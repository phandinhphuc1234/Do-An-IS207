import React from "react";



const HeroSection = () => {

  // Placeholder cho ảnh nền, bạn nên thay bằng URL của ảnh thật (nếu có)

  // hoặc dùng base64 data cho component React.

  const backgroundImageUrl =

    "https://placehold.co/1920x1080/7F8C8D/ffffff?text=Galaxy+Event+Background";



  const YOUTUBE_VIDEO_ID = "aaVLuXKJ8x0";

  const url = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&modestbranding=1&rel=0&iv_load_policy=3`;



  return (

    // Lớp chứa chính, đảm bảo nó có chiều cao đầy đủ và căn giữa nội dung

    // Dùng pt-[64px] để bù lại chiều cao của Navbar (khoảng h-16 = 64px)

    <div className="relative w-screen h-screen overflow-hidden bg-black ">

      {/* Background Image / Placeholder */}

      <div>
                <iframe

                    // Thủ thuật CSS để đảm bảo iframe luôn lấp đầy màn hình, không bị khoảng trống

                    className="absolute top-1/2 left-1/2 max-w-full min-h-screen w-[150vw] h-[150vh] transform -translate-x-1/2 -translate-y-1/2"

                    src={url}

                    title="Samsung Galaxy Event Background Video"

                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"

                    allowFullScreen={false} // Ngăn người dùng mở toàn màn hình

                ></iframe>

      </div>



      {/* Nội dung chính: Căn giữa theo chiều dọc và ngang */}

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

          {/* Nút Reserve now */}

          <button className="mt-8 px-8 py-3 bg-white text-black font-semibold text-base rounded-full hover:bg-gray-200 transition-colors shadow-lg">

            Reserve now

          </button>

        </div>

      </div>



      {/* Footer nhỏ ở góc trái dưới (mô phỏng icon) */}

      <div className="absolute bottom-5 left-5 text-white/50 z-20">

        <span className="text-2xl opacity-50">&copy;</span>

      </div>

     

      {/* Thanh phản hồi (Feedback) ở góc phải */}

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 -rotate-90 origin-bottom-right p-2 bg-gray-700/80 text-white text-xs font-medium cursor-pointer z-20">
        FEEDBACK
      </div>

    </div>

  );

};



export default HeroSection;