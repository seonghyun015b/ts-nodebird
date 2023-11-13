import { Box, Button } from '@mui/material';
import Carsoul from 'react-material-ui-carousel';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ClearIcon from '@mui/icons-material/Clear';
import Image from 'next/image';

const style = {
  position: 'fixed',
  top: '6rem',
  left: '0%',
  width: '100%',
  bgcolor: 'black',
  height: 'calc(100% - 6rem)',
  pt: 10,
};

interface Props {
  open: boolean;
  images: { src: string }[];
  onClose: () => void;
}

const ImagesZoom = ({ images, onClose, open }: Props) => {
  return (
    <>
      <Box
        component='header'
        sx={{
          backgroundColor: 'white',
          width: '100%',
          height: '6rem',
          textAlign: 'center',
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2>상세 이미지</h2>
        <Button
          variant='text'
          size='large'
          style={{ position: 'absolute', right: 0 }}
          onClick={onClose}
        >
          <ClearIcon fontSize='medium' />
        </Button>
      </Box>
      <Box sx={style}>
        <Carsoul
          NextIcon={<ArrowRightIcon />}
          PrevIcon={<ArrowLeftIcon />}
          sx={{ width: '900px', margin: 'auto' }}
          navButtonsAlwaysVisible
        >
          {images.map((image) => (
            <div key={image.src} style={{ padding: '32px', textAlign: 'center' }}>
              <Image
                src={`http://localhost:3065/${image.src}`}
                width='800'
                height='800'
                alt={image.src}
                style={{ margin: '0 auto' }}
              />
            </div>
          ))}
        </Carsoul>
      </Box>
    </>
  );
};

export default ImagesZoom;
