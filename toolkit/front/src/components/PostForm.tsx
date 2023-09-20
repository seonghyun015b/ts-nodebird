import React, {
  useCallback,
  useRef,
  useState,
  ChangeEvent,
  useEffect,
} from 'react';
import { Button, Form, Input } from 'antd';
import { AppDispatch, RootState } from '../toolkit/index';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import {
  addPostAction,
  removeImages,
  upLoadImageAction,
} from '../toolkit/post';
import useInput from '../hooks/useInput';

const FormWrapper = styled(Form)`
  margin: 10px 0 20px;
`;

const PostForm = () => {
  const {
    imagePaths,
    addPostDone,
    addPostLoading,
  }: { imagePaths: string[]; addPostDone: boolean; addPostLoading: boolean } =
    useSelector((state: RootState) => state.post);

  const imageInput = useRef<HTMLInputElement | null>(null);

  const onClickImageUpLoad = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, [imageInput.current]);

  const [text, onChangeText, setText] = useInput('');

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onChangeImages = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();

    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });

    dispatch(upLoadImageAction(imageFormData));
  }, []);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요');
    }

    const formData = new FormData();

    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);

    dispatch(addPostAction(formData));
  }, [text, imagePaths]);

  const onRemoveImage = useCallback(
    (index: number) => () => {
      dispatch(removeImages(index));
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
