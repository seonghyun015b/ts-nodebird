import { CardHeader } from '@mui/material';

import UserAvatar from '../UserAvatar';
import HeaderAction from '../HeaderAction';
import { useState } from 'react';
import useMyInfoQuery from '../../../../hooks/queries/useMyInfoQuery';
import Tweet from '../../../../types/tweet';
import FollowButton from '../../FollowButton';
import ReportModal from '../../ReportModal';

interface Props {
  data: Tweet;
}

const RetweetCardHeader = ({ data }: Props) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const { data: me } = useMyInfoQuery();
  const toggleReportModal = () => {
    setShowReportModal((pre) => !pre);
  };

  return (
    <>
      <ReportModal open={showReportModal} handleClose={toggleReportModal} />
      <CardHeader
        title={
          <>
            {`${data.User.nickname}님이 리트윗 하셨습니다.`}
            {me && me.id !== data.User.id && <FollowButton user={data.User} />}
          </>
        }
        avatar={<UserAvatar user={data.User} />}
        action={
          <HeaderAction user={data.User} postId={data.id} toggleReportModal={toggleReportModal} />
        }
      />
    </>
  );
};

export default RetweetCardHeader;
