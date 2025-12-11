// src/components/ProductCard.jsx
import React from 'react';
import BuyNowButton from './BuyNowButton';

const ProductCard = ({ title, imageSrc }) => {
  return (
    // Thẻ cha: w-[300px] và h-[400px] là bắt buộc để định nghĩa kích thước.
    <div className="group w-[295px] h-[350px] bg-white relative overflow-hidden shadow-xl rounded-lg">
      
      {/* 1. Product Image - Tuyệt đối (absolute) để che toàn bộ thẻ */}
      <img 
        src={imageSrc} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
      />
      
      {/* 2. Content Container - Đặt trên ảnh (z-10), loại bỏ lớp phủ màu đen */}
      <div className="absolute inset-0 
                      text-white /* Giữ màu chữ trắng để nổi bật trên ảnh */
                      flex flex-col items-center /* CĂN GIỮA NỘI DUNG THEO CHIỀU NGANG */
                      justify-between 
                      p-6 z-10">
          
          {/* Tiêu đề Sản phẩm - Đã được căn giữa nhờ items-center trên cha */}
          <h3 className="text-2xl font-bold mt-4 text-center" /* THÊM text-center để chắc chắn */
              style={{ textShadow: '0 0 5px black' }}> 
              {title}
          </h3>

          {/* Phần tử giãn nở để đẩy nút "Buy now" xuống dưới */}
          <div className="flex-grow"></div> 

          {/* 3. Buy Now Button Container (LỚP TRƯỢT MỚI) */}
      {/*         - absolute inset-x-0 bottom-0: Neo vào đáy thẻ, chiều rộng full.
        - transform translate-y-full: Ẩn nút bằng cách đẩy nó xuống 100% chiều cao của nó.
        - group-hover:translate-y-0: Kéo nút lên khi di chuột vào thẻ cha.
        - transition-transform duration-300: Hiệu ứng chuyển động mượt mà.
absolute inset-x-0 bottom-0
      */}
      <div className="absolute inset-x-0 bottom-0 h-16
                      flex items-center justify-center z-20 
                      transform translate-y-full 
                      group-hover:-translate-y-2 
                      transition-transform duration-300 ease-out">
        <BuyNowButton text="Buy now" /> 
      </div>

      </div>

    </div>
  );
};

export default ProductCard;