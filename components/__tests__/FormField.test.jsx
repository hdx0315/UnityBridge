import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FormField from '../FormField';

describe('FormField Component', () => {
  it('renders the title and input field', () => {
    const { getByText, getByPlaceholderText } = render(
      <FormField 
        title="Username" 
        placeholder="Enter your username" 
      />
    );

    // Check if title is rendered correctly
    expect(getByText('Username')).toBeTruthy();

    // Check if placeholder text is rendered correctly
    expect(getByPlaceholderText('Enter your username')).toBeTruthy();
  });

  it('renders and toggles password visibility', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <FormField 
        title="Password" 
        placeholder="Enter your password" 
      />
    );

    // Check if password input is rendered with secureTextEntry
    const inputField = getByPlaceholderText('Enter your password');
    expect(inputField.props.secureTextEntry).toBe(true);

    // Check if eye icon is present
    const toggleButton = getByTestId('toggle-password-visibility');
    expect(toggleButton).toBeTruthy();

    // Simulate pressing the toggle button
    fireEvent.press(toggleButton);
    expect(inputField.props.secureTextEntry).toBe(false); // Password should now be visible

    // Simulate pressing the toggle button again
    fireEvent.press(toggleButton);
    expect(inputField.props.secureTextEntry).toBe(true); // Password should be hidden again
  });

  it('calls handleChangeText when text is changed', () => {
    const mockHandleChangeText = jest.fn();

    const { getByPlaceholderText } = render(
      <FormField 
        title="Username" 
        placeholder="Enter your username" 
        handleChangeText={mockHandleChangeText} 
      />
    );

    const inputField = getByPlaceholderText('Enter your username');
    
    // Simulate typing text
    fireEvent.changeText(inputField, 'Tharindu Darshana');

    // Check if handleChangeText was called with the correct value
    expect(mockHandleChangeText).toHaveBeenCalledWith('Tharindu Darshana');
  });

  it('displays and toggles password visibility when title is "Password"', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <FormField 
        title="Password" 
        placeholder="Enter your password" 
      />
    );

    // Check if the eye icon is present
    const eyeIcon = getByTestId('toggle-password-visibility');
    expect(eyeIcon).toBeTruthy();

    // Check if secureTextEntry is true at first
    const inputField = getByPlaceholderText('Enter your password');
    expect(inputField.props.secureTextEntry).toBe(true);

    // Simulate clicking the eye icon to show password
    fireEvent.press(eyeIcon);
    expect(inputField.props.secureTextEntry).toBe(false); // Password should now be visible

    // Simulate clicking the eye icon again to hide password
    fireEvent.press(eyeIcon);
    expect(inputField.props.secureTextEntry).toBe(true); // Password should be hidden again
  });
});
