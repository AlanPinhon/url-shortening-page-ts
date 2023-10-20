import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LinkInput } from '../../src/components/LinkInput/LinkInput';

describe('tests in <LinkInput/>', () => {

  test('should render initial input', () => {
    const onAddShortLinkMock = vi.fn();
    render(<LinkInput onAddShortLink={onAddShortLinkMock} />);
    
    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;

    expect(linkInput).toBeTruthy();
    expect(linkInput.value).toBe('');
  });

  test('should show an error if the input value is empty', () => {
    const onAddShortLinkMock = vi.fn();
    render(<LinkInput onAddShortLink={onAddShortLinkMock} />);
    
    const shortenBtn = screen.getByRole('button');
    fireEvent.click(shortenBtn);

    expect(screen.getByText('Please add a link')).toBeTruthy();
  });

  test('should show an error if the URL format is invalid', () => {
    const onAddShortLinkMock = vi.fn();
    const invalidLink = 'www.youtube.com';

    render(<LinkInput onAddShortLink={onAddShortLinkMock} />);
    
    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByRole('button');

    fireEvent.change(linkInput, {target: {value: invalidLink}})
    fireEvent.click(shortenBtn);

    expect(screen.getByText('Invalid URL submitted')).toBeTruthy();
  });

  test('should call the onAddShortLink function with a valid link', () => {
    const onAddShortLinkMock = vi.fn();
    const validLink = 'https://www.youtube.com';

    render(<LinkInput onAddShortLink={onAddShortLinkMock} />);
    
    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByRole('button');

    fireEvent.change(linkInput, {target: {value: validLink}})
    fireEvent.click(shortenBtn);

    expect(onAddShortLinkMock).toBeCalledWith(validLink);
    expect(onAddShortLinkMock).toBeCalledTimes(1);
  });
  
});