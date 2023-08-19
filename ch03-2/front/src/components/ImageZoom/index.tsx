import React, { useState } from 'react';
import Slick from 'react-slick';

import {
  Overlay,
  Header,
  CloseBtn,
  SlickWrapper,
  ImgWrapper,
  Indicator,
  Global,
} from './styles';

interface ImageZoomProp {
  images: { src: string }[];
  onClose: () => void;
}

const ImageZoom = ({ images, onClose }: ImageZoomProp) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <div>
        <SlickWrapper>
          <Slick
            initialSlide={0}
            afterChange={(slide: number) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((i) => (
              <ImgWrapper key={i.src}>
                <img src={i.src} alt={i.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}
              {'  '}/{'  '}
              {images.length}
            </div>
          </Indicator>
        </SlickWrapper>
      </div>
    </Overlay>
  );
};

export default ImageZoom;
