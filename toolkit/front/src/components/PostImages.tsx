import React, { useCallback, useState } from 'react';
import ImageZoom from './ImageZoom';
import { PlusOutlined } from '@ant-design/icons';

interface PostImages {
  images: { src: string }[];
}

const PostImages = ({ images }: PostImages) => {
  const [showImageZoom, setShowImageZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImageZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          role='presentation'
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <img
          role='presentation'
          style={{ width: '50%', display: 'inline-block' }}
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role='presentation'
          style={{ width: '50%', display: 'inline-block' }}
          src={`http://localhost:3065/${images[1].src}`}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }

  return (
    <>
      <div>
        <img
          role='presentation'
          style={{ width: '50%', display: 'inline-block' }}
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        <div
          role='presentation'
          style={{
            display: 'inline-block',
            width: '50%',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1} 개의 사진 더보기
        </div>
        {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
      </div>
    </>
  );
};

export default PostImages;
