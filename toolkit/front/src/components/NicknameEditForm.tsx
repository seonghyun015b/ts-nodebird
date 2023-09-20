import React, { useCallback, useMemo } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/configureStore';
import useInput from '../hooks/useInput';
import { changeNicknameAction } from '../toolkit/user';

const NicknameEditForm = () => {
  const { me, changeNicknameLoading } = useSelector(
    (state: RootState) => state.user
  );
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch<AppDispatch>();

  const style = useMemo(
    () => ({
      marginBottom: '20px',
      border: '1px solid #d9d9d9',
      padding: '20px',
    }),
    []
  );

  const onSubmit = useCallback(() => {
    dispatch(changeNicknameAction(nickname));
  }, [nickname]);

  return (
    <Form style={style}>
      <Input.Search
        addonBefore='닉네임'
        enterButton='수정'
        value={nickname}
        onChange={onChangeNickname}
        loading={changeNicknameLoading}
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
