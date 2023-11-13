import React, { useState } from 'react';
import { CircularProgress, IconButton, List, ListItemButton, Paper } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useMyInfoQuery from '../../../hooks/queries/useMyInfoQuery';
import { removePostAPI } from '../../../api/tweet';
import User from '../../../types/user';

interface Props {
  user: Partial<User> & { id: number };
  postId: number;
  toggleReportModal: () => void;
}

const HeaderAction = ({ postId, user, toggleReportModal }: Props) => {
  const queryClient = useQueryClient();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { data: me } = useMyInfoQuery();

  const { mutate: removePostMutate, isLoading: removePostIsLoading } = useMutation(
    () => removePostAPI(postId),
    {
      onError: (err: any) => {
        alert(err.response.data);
      },
      onSuccess: () => {
        queryClient.refetchQueries(['tweets']);
      },
    }
  );

  const toggleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  return (
    <>
      <IconButton aria-label='settings' onClick={toggleDropDown}>
        <MoreVertIcon />
      </IconButton>
      <Paper sx={{ display: isDropDownOpen ? 'block' : 'none', position: 'absolute' }}>
        <List disablePadding>
          {me?.id === user.id ? (
            <ListItemButton onClick={() => removePostMutate()}>
              {removePostIsLoading ? <CircularProgress size='1.5rem' /> : <DeleteIcon />}
            </ListItemButton>
          ) : (
            <ListItemButton onClick={toggleReportModal}>
              <ReportIcon />
            </ListItemButton>
          )}
        </List>
      </Paper>
    </>
  );
};

export default HeaderAction;
