import { create } from 'zustand';

interface SnackbarState {
  message: string;
  isOpen: boolean;
}

interface GlobalStore {
  snackBar: SnackbarState;
  openSnackBar: () => void;
  closeSnackBar: () => void;
  setSnackBarMessage: (message: string) => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  snackBar: {
    message: '',
    isOpen: false,
  },
  openSnackBar: () => {
    set((state) => ({
      snackBar: { ...state.snackBar, isOpen: true },
    }));
  },
  closeSnackBar: () => {
    set((state) => ({
      snackBar: { ...state.snackBar, isOpen: false },
    }));
  },
  setSnackBarMessage: (message: string) => {
    set((state) => ({
      snackBar: { ...state.snackBar, message },
    }));
  },
}));

export default useGlobalStore;
