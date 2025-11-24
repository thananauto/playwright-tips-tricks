import {  test, expect } from './../init/pw.apireq.fixture';
import { request } from '@playwright/test';


test.describe('API Tests', () => {

  test('Validate the /post and /comments response', { tag: '@json' }, async ({ apiRequest }) => {
    const postResponse = await apiRequest.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(postResponse.status()).toBe(200);
    const postData = await postResponse.json();
    expect(postData).toHaveProperty('id', 1);

    const commentsResponse = await apiRequest.get('https://jsonplaceholder.typicode.com/comments/1');
    expect(commentsResponse.status()).toBe(200);
     const commentsData = await commentsResponse.json();
    expect(commentsData).toHaveProperty('id', 1);
  });

 
   test('Create a post', { tag: '@json' }, async ({ apiRequest }) => {
    const userIds = [1, 2, 3, 4, 5];
    for (const id of userIds) {
   
    const postResponse = await apiRequest.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'foo'+id,
        body: 'bar'+id,
        userId: id
      },
      headers: {    'Content-type': 'application/json; charset=UTF-8'  }
    });
    expect(postResponse.status()).toBe(201);
    const postData = await postResponse.json();
    expect(postData).toHaveProperty('userId', id);
    }
    
  });

});