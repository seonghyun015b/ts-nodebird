import React, { useCallback, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import {
  removeImageAction,
  addPostRequestAction,
  UPLOAD_IMAGES_REQUEST,
} from '../reducers/post';
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
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요');
    }

    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });

    formData.append('content', text);

    return dispatch(addPostRequestAction(formData));
  }, [text, imagePaths]);

  const onChangeImages = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f);
      });
      dispatch({
        type: UPLOAD_IMAGES_REQUEST,
        data: imageFormData,
      });
    },
    []
  );

  const onRemoveImage = useCallback(
    (index: number) => () => {
      dispatch(removeImageAction(index));
    },
    []
  );

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
          name='image'
          type='file'
          style={{ display: 'none' }}
          multiple
          ref={imageInput}
          onChange={onChangeImages}
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
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: '200px' }}
              alt={v}
            />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </FormWrapper>
  );
};

export default PostForm;
