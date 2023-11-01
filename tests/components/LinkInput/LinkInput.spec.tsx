import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { LinkInput } from '../../../src/components/LinkInput/LinkInput';

describe('tests in <LinkInput/>', () => {

  test('should render initial input', () => {
    const onAddShortLinkMock = vi.fn();
    const setErrorMsgMock = vi.fn();
    render(
      <LinkInput
        onAddShortLink={onAddShortLinkMock}
        setErrorMsg={setErrorMsgMock}
        errorMsg=''
      />
    );
    
    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;

    expect(linkInput).toBeTruthy();
    expect(linkInput.value).toBe('');
  });

  test('should show an error message', () => {
    const onAddShortLinkMock = vi.fn();
    const setErrorMsgMock = vi.fn();

    render(
      <LinkInput
        onAddShortLink={onAddShortLinkMock}
        setErrorMsg={setErrorMsgMock}
        errorMsg='Please add a link'
      />
    );
    
    const errorMsg = screen.getByText('Please add a link');
    expect(errorMsg).toBeTruthy(); 
  });

  test('should call the onAddShortLink function with the text: "Please add a link"', () => {
    const onAddShortLinkMock = vi.fn();
    const setErrorMsgMock = vi.fn();

    render(
      <LinkInput
        onAddShortLink={onAddShortLinkMock}
        setErrorMsg={setErrorMsgMock}
        errorMsg=''
      />
    );
    
    const shortenBtn = screen.getByText('Shorten it!');
    fireEvent.click(shortenBtn);

    expect(setErrorMsgMock).toBeCalledWith('Please add a link'); 
  });

  test('should call the onAddShortLink function with the text: "Invalid URL submitted"', () => {
    const invalidLink = 'www.youtube.com';
    const onAddShortLinkMock = vi.fn();
    const setErrorMsgMock = vi.fn();

    render(
      <LinkInput
        onAddShortLink={onAddShortLinkMock}
        setErrorMsg={setErrorMsgMock}
        errorMsg=''
      />
    );
    
    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByRole('button');

    fireEvent.change(linkInput, {target: {value: invalidLink}})
    fireEvent.click(shortenBtn);

    expect(setErrorMsgMock).toBeCalledWith('Invalid URL submitted');
  });

  test('should call the onAddShortLink function with a valid link', () => {
    const validLink = 'https://www.youtube.com';
    const onAddShortLinkMock = vi.fn();
    const setErrorMsgMock = vi.fn();

    render(
      <LinkInput
        onAddShortLink={onAddShortLinkMock}
        setErrorMsg={setErrorMsgMock}
        errorMsg=''
      />
    );
    
    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByRole('button');

    fireEvent.change(linkInput, {target: {value: validLink}})
    fireEvent.click(shortenBtn);

    expect(onAddShortLinkMock).toBeCalledWith(validLink);
    expect(onAddShortLinkMock).toBeCalledTimes(1);
  });
  
});