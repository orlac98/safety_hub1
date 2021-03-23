import React from 'react';
import {Container,Card,UserInfo,UserImg, UserName, FileInfo,PostTime, PostText, PostImg} from '../styles/filesStyles';


const PostCard = () => {
    return (
        <Card>
        <UserInfo>
        <UserImg source={require('../assets/ProfilePic_001.png')}/>
        <FileInfo>
        <UserName >Orla Connelly </UserName>
        <PostTime>4 hours</PostTime>
        </FileInfo>
        </UserInfo>
        <PostText>this is a test</PostText>
        <PostImg source={require('../assets/logo.png')}/>
      

      </Card>
    );
};

export default PostCard;