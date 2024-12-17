import React from 'react';
import { render } from '@testing-library/react-native';
import MessageItem from '../MessageItem';

describe('MessageItem Component', () => {

  it('renders correctly for current user message', () => {
    const message = { text: 'Hello, this is my message', userId: 'user123' };
    const currentUser = { userId: 'user123' };

    const { getByTestId, getByText } = render(
      <MessageItem message={message} currentUser={currentUser} />
    );

    // Check if the message is displayed properly
    const messageText = getByText('Hello, this is my message');
    expect(messageText).toBeTruthy(); // Check that it exists

    // Check if the message is aligned to the right (flex-end)
    const messageContainer = getByTestId('message-container');
    expect(messageContainer.props.style).toMatchObject({
      justifyContent: 'flex-end',
    });
  });

  it('renders correctly for another user\'s message', () => {
    const message = { text: 'Hello from another user', userId: 'user456' };
    const currentUser = { userId: 'user123' };

    const { getByTestId, getByText } = render(
      <MessageItem message={message} currentUser={currentUser} />
    );

    // Check if the message is displayed properly
    const messageText = getByText('Hello from another user');
    expect(messageText).toBeTruthy(); // Check that it exists

    // Check if the message is aligned to the left (for other users)
    const messageContainer = getByTestId('message-container');
    expect(messageContainer.props.style).toMatchObject({
      marginLeft:4, 
    });
  });

  it('renders correctly when message is null', () => {
    const { queryByText } = render(
      <MessageItem message={null} currentUser={{ userId: 'user123' }} />
    );

    const messageText = queryByText(/.*/); // Any text
    expect(messageText).toBeNull(); 
  });

  it('renders correctly when currentUser is null', () => {
    const message = { text: 'Hello, I am anonymous', userId: 'user123' };

    const { getByText } = render(
      <MessageItem message={message} currentUser={null} />
    );

    // Check if the message is displayed properly
    const messageText = getByText('Hello, I am anonymous');
    expect(messageText).toBeTruthy(); // Check that it exists
  });

  it('renders correctly when message and currentUser are both null', () => {
    const { queryByText } = render(
      <MessageItem message={null} currentUser={null} />
    );

    const messageText = queryByText(/.*/); // Any text
    expect(messageText).toBeNull(); 
  });

});
