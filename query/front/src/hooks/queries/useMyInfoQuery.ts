import { useQuery } from 'react-query';
import { loadMyInfoAPI } from '../../apis/user';
import User from '../../interface/user';

const useMyInfoQuery = () => {
  return useQuery<User>('user', loadMyInfoAPI, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export default useMyInfoQuery;
