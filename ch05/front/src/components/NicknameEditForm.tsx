import React, { useCallback, useMemo } from 'react';
import { Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { changeNicknameRequestAction } from '../reducers/user';
import useInput from '../hooks/useInput';

const NicknameEditForm = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();

  const style = useMemo(
    () => ({
      marginBottom: '20px',
      border: '1px solid #d9d9d9',
      padding: '20px',
    }),
    []
  );

  const onSubmit = useCallback(() => {
    dispatch(changeNicknameRequestAction(nickname));
  }, [nickname]);
  return (
    <Form style={style}>
      <Input.Search
        addonBefore='닉네임'
        enterButton='수정'
        value={nickname}
        onChange={onChangeNickname}
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
