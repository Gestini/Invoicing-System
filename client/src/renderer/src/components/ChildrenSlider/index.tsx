import React from 'react'
import { Swiper } from 'swiper/react'
import { SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import './styles.scss'

export const ChildrenSlider = ({ children, spaceBetween = 15 }) => {
  return (
    <div className='relative'>
      <Swiper
        slidesPerView='auto'
        spaceBetween={spaceBetween}
        className='flex gap-4'
        scrollbar={{
          hide: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Scrollbar]}
      >
        {React.Children.map(children, (child) => (
          <SwiperSlide>{child}</SwiperSlide>
        ))}
      </Swiper>
      <div className='z-20 absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--c-bg-color)] to-transparent opacity-1 pointer-events-none'></div>
    </div>
  )
}
