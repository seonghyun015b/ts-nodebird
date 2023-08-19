import React from 'react';
import Link from 'next/link';

interface PostCardContentProp {
  postData: string;
}

const PostCardContent = ({ postData }: PostCardContentProp) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s]+)/)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={i}>
              {v}
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

export default PostCardContent;
