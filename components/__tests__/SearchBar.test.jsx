import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../SearchBar'; 

describe('SearchBar Component', () => {
  it('renders correctly with initial props', () => {
    const { getByPlaceholderText } = render(
      <SearchBar searchQuery="" setSearchQuery={jest.fn()} />
    );

    // Check if the TextInput with placeholder "Search Contact" is present
    const inputElement = getByPlaceholderText('Search Contact');
    expect(inputElement).toBeTruthy();
  });

  it('displays the correct placeholder text', () => {
    const { getByPlaceholderText } = render(
      <SearchBar searchQuery="" setSearchQuery={jest.fn()} />
    );

    const inputElement = getByPlaceholderText('Search Contact');
    expect(inputElement.props.placeholder).toBe('Search Contact');
  });

  it('updates the search query as the user types', () => {
    const mockSetSearchQuery = jest.fn(); // Mock function 
    const { getByPlaceholderText } = render(
      <SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />
    );

    const inputElement = getByPlaceholderText('Search Contact');

    // user typing "Hello" into the search input
    fireEvent.changeText(inputElement, 'Hello');

    // Check if setSearchQuery was called with the new input
    expect(mockSetSearchQuery).toHaveBeenCalledWith('Hello');
  });

  it('renders with the correct value from props', () => {
    const { getByDisplayValue } = render(
      <SearchBar searchQuery="Test Query" setSearchQuery={jest.fn()} />
    );

    // Check if the input displays the initial value of "Test Query"
    const inputElement = getByDisplayValue('Test Query');
    expect(inputElement).toBeTruthy();
  });
});
