import React from 'react';
import { ProfileType } from '../types/types';
import profileReducer, { actions } from "./profileReducer";

let state = {
    posts: [
        {id: 1,  message: 'Hi, how are you?', likesCount: '15'},
        {id: 2,  message: 'Its my first post', likesCount: '23'}
    ],
    profile: null,
    status: '',
    newPostText: ''
}

test('new post should be added', () => {
    // prepare date
    let action = actions.addPostActionCreator("new post text");
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts.length).toBe(3);
  });

test('message of new post should be correct', () => {
    // prepare date
    let action = actions.addPostActionCreator("new post text");
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts[2].message).toBe("new post text");
});

test('after deleting length of messages should be decrement', () => {
    // prepare date
    let action = actions.deletePost(1);
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.length).toBe(1);
});

test('after deleting length should not be decrement if id is incorrect', () => {
    // prepare date
    let action = actions.deletePost(112);
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.length).toBe(2);
});