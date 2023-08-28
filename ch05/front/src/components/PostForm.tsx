import React, { useCallback, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { addPostRequestAction } from '../reducers/post';
import useInput from '../hooks/useInput';

const FormWrapper = styled(Form)`
  margin: 10px 0 20px;
`;

const PostForm = () => {
  const imageInput = useRef<HTMLInputElement | null>(null);

  const onClickImageUpLoad = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, [imageInput.current]);

  const dispatch = useDispatch();

  const {
    imagePaths,
    addPostDone,
    addPostLoading,
  }: { imagePaths: string[]; addPostDone: boolean; addPostLoading: boolean } =
    useSelector((state: RootState) => state.post);

  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    dispatch(addPostRequestAction(text));
  }, [text]);

  return (
    <FormWrapper encType='multipart/form-data' onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder='어떤 신기한 일이 있었나요'
      />
      <div>
        <input
          type='file'
          style={{ display: 'none' }}
          multiple
          ref={imageInput}
        />
        <Button onClick={onClickImageUpLoad}>이미지 업로드</Button>
        <Button
          type='primary'
          style={{ float: 'right' }}
          htmlType='submit'
          loading={addPostLoading}
        >
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v: string) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </FormWrapper>
  );
};

export default PostForm;
