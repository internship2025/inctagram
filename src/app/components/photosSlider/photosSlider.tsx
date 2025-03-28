"use client";

import { MouseEvent, useCallback, useState } from "react";
import Image from "next/image";
import s from "./photosSlider.module.css";
import photo from "./../../../../public/images/photo.png";
import Link from "next/link";
import { ArrowLeft } from "./ArrowLeft";
import { ArrowRight } from "./ArrowRight";

type PhotosSlider = {
  size?: "small" | "large";
  images: Array<{url: string, width: number, height: number, fileSize: number, uploadId: string, createdAt: string
  }>
  ownerId: string;
  id: number;
  isSlider?: boolean;
};

const PhotosSlider = ({
  isSlider = false,
  size = 'small',
  images,
  ownerId,
  id,
}: PhotosSlider) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCurcle, setActiveCurcle] = useState(0);

  let maxIndex = images.length - 1;

  const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (maxIndex > activeCurcle) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setActiveCurcle(activeCurcle + 1);
    }
  };

  const prevSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (0 < activeCurcle) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setActiveCurcle(activeCurcle - 1);
    }
  };

  const handleDotClick = (e: MouseEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (activeCurcle < index) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (activeCurcle > index) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
    setActiveCurcle(index);
  };
 
  const length = images.length;
  let src = length !== 0 ? images[currentIndex].url : photo;

   const setSize = useCallback((size: string) =>{
    let obj = {
      width: 972,
      height: 564
    }
       if(size === 'small'){
        obj.width = 234
        obj.height = 240
       }
       return obj
   }, [size])
   

  return (
    <div className={s.commonStyle}>
      <Link href={`/profile/${ownerId}?postId=${id}`}>
        <Image
          width={setSize(size).width}
          height={setSize(size).height}
          src={src}
          alt={`Photo ${currentIndex + 1}`}
        />
      </Link>
      {length > 1 && !isSlider && (
        <>
          <button
          className={s.buttonRight}
            onClick={prevSlide}
          >
            <ArrowLeft size = {size}/>
          </button>
          <button
           className={s.buttonLeft }
            onClick={nextSlide}
          >
           <ArrowRight size = {size}/>
          </button>
          <div className={`${size === 'small' ? s.scrollBarSmall : s.scrollBarLarge} ${s.scrollBar}`}>
            {images.map((it, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => handleDotClick(e, index)}
                  className={`${size === 'small' ? s.curcleSmall : s.curcleLarge}  ${s.curcle} ${index === activeCurcle ? s.active : ""}`}
                ></div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default PhotosSlider;
