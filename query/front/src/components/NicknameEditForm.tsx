import React, { useMemo, useCallback } from 'react';
import { Form, Input } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import useMyInfoQuery from '../hooks/queries/useMyInfoQuery';
import useInput from '../hooks/useInput';
import { changeNicknameAPI } from '../apis/user';

const NicknameEditForm = () => {
  const style = useMemo(
    () => ({
      marginBottom: '20px',
      border: '1px solid #d9d9d9',
      padding: '20px',
    }),
    []
  );

  const queryClient = useQueryClient();

  const { data: me } = useMyInfoQuery();

  const [editNickname, handleEditNickname] = useInput(me?.nickname);

  const { mutate } = useMutation(changeNicknameAPI, {
    onSuccess: () => {
      queryClient.refetchQueries('user');
      alert('변경이 완료되었습니다.');
    },
  });

  const onSubmit = useCallback(() => {
    mutate(editNickname);
  }, [mutate, editNickname]);

  return (
    <Form style={style}>
      <Input.Search
        addonBefore='닉네임'
        enterButton='수정'
        value={editNickname}
        onChange={handleEditNickname}
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
