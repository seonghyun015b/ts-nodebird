import React, { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { loadMyInfoAPI } from '../apis/user';
import { addPostAPI, uploadImagesAPI } from '../apis/post';
import { AxiosError } from 'axios';

const FormWrapper = styled(Form)`
  margin: 10px 0 20px;
`;

const PostForm = () => {
  const queryClient = useQueryClient();

  const { data: me } = useQuery('user', loadMyInfoAPI);

  const [text, onChangeText, setText] = useInput('');
  const [imagePaths, setImagePaths] = useState([]);

  const imageInput = useRef<HTMLInputElement>(null);

  const onClickImageUpload = useCallback(() => {
    imageInput.current?.click();
  }, []);

  const { mutate, isLoading } = useMutation(addPostAPI, {
    onSuccess: () => {
      queryClient.refetchQueries('post');
    },
    onError: (err: AxiosError) => {
      alert(err.response?.data);
    },
  });

  const onChangeImages = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();

    e.target.files &&
      Array.from(e.target.files).forEach((f) => {
        imageFormData.append('image', f);
      });
    uploadImagesAPI(imageFormData).then((result) => {
      setImagePaths((prev) => prev.concat(result));
    });
  }, []);

  const onRemoveImage = useCallback(
    (index: number) => () => {
      setImagePaths((prev) => {
        return prev.filter((v, i) => i !== index);
      });
    },
    []
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      if (!text || !text.trim()) {
        return alert('게시글을 작성하세요');
      }

      const formData = new FormData();
      formData.append('content', text);

      imagePaths.forEach((p) => {
        formData.append('image', p);
      });
      mutate(formData);
      setText('');
    },
    [mutate, text, imagePaths, setText]
  );

  return (
    <FormWrapper encType='multipart/form-data' onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder='어떤 신기한 일이 있었나요?'
      />
      <div>
        <input
          style={{ display: 'none' }}
          type='file'
          name='image'
          multiple
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type='primary' style={{ float: 'right' }} htmlType='submit' loading={isLoading}>
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
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
