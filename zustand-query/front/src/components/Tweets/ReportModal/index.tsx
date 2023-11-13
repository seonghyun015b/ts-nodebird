import { Textarea } from '@mui/joy';
import { Typography, Modal, Box, Button } from '@mui/material';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ReportModal = ({ open, handleClose }: Props) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography>신고내용</Typography>
        <Textarea minRows={4} maxRows={8} />
        <Button variant='contained' sx={{ mt: 3 }}>
          신고하기
        </Button>
      </Box>
    </Modal>
  );
};

export default ReportModal;
