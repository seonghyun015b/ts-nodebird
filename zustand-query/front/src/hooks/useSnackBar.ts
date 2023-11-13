import useGlobalStore from '../zustand/store';

const useSnackBar = (message: string) => {
  const { setSnackBarMessage, openSnackBar } = useGlobalStore();

  const open = () => {
    setSnackBarMessage(message);
    openSnackBar();
  };

  return open;
};

export default useSnackBar;
