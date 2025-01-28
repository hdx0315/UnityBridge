import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../CustomButton';

describe('CustomButton Component', () => {
  it('renders correctly with given props', () => {
    const { getByText } = render(
      <CustomButton
        title="Click Me"
        handlePress={() => {}}
        containerStyles="bg-red-500"
        textStyles="text-white"
        isLoading={false}
      />
    );

    // Check if the button renders with the correct text
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('disables the button and adds opacity when isLoading is true', () => {
    const { getByTestId } = render(
      <CustomButton title="Click Me" handlePress={() => {}} isLoading={true} />
    );

    // Check if the button is disabled
    const button = getByTestId('custom-button');
    expect(button.props.disabled).toBe(true);

    // Check if the opacity class is applied (depending on your implementation)
    expect(button.props.className).toContain('opacity-50');
  });

  it('calls handlePress when the button is pressed', () => {
    const handlePressMock = jest.fn();

    const { getByTestId } = render(
      <CustomButton title="Click Me" handlePress={handlePressMock} isLoading={false} />
    );

    const button = getByTestId('custom-button');
    fireEvent.press(button);

    // Check if the handlePress function was called
    expect(handlePressMock).toHaveBeenCalled();
  });

  it('does not call handlePress when the button is disabled', () => {
    const handlePressMock = jest.fn();

    const { getByTestId } = render(
      <CustomButton title="Click Me" handlePress={handlePressMock} isLoading={true} />
    );

    const button = getByTestId('custom-button');
    fireEvent.press(button);

    // Check if the handlePress function was NOT called
    expect(handlePressMock).not.toHaveBeenCalled();
  });
});
