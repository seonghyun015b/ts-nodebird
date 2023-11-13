import { useQuery } from '@tanstack/react-query';
import { loadMyInfoAPI } from '../../api/auth';
import User from '../../types/user';

const useMyInfoQuery = () => {
  return useQuery<User>(['user'], loadMyInfoAPI, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
export default useMyInfoQuery;
