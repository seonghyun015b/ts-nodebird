import { useState } from 'react';
import { CardHeader } from '@mui/material';

import UserAvatar from '../UserAvatar';
import HeaderAction from '../HeaderAction';
import User from '../../../../types/user';
import ReportModal from '../../ReportModal';
import useMyInfoQuery from '../../../../hooks/queries/useMyInfoQuery';
import FollowButton from '../../FollowButton';

interface Props {
  user: Partial<User> & { id: number };
  postId: number;
  createdAt: string;
  disableAction?: boolean;
}

const TweetCardHeader = ({ user, postId, createdAt, disableAction = false }: Props) => {
  const [showReportModal, setShowReportModal] = useState(false);

  const { data: me } = useMyInfoQuery();

  const toggleReportModal = () => {
    setShowReportModal((prev) => !prev);
  };
  return (
    <>
      <ReportModal open={showReportModal} handleClose={toggleReportModal} />
      <CardHeader
        avatar={<UserAvatar user={user} />}
        action={
          !disableAction && (
            <HeaderAction user={user} postId={postId} toggleReportModal={toggleReportModal} />
          )
        }
        title={
          <>
            {user.nickname}
            {me && me.id !== user.id && <FollowButton user={user} />}
          </>
        }
      />
    </>
  );
};

export default TweetCardHeader;
