import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';
import { ShortenedLinkItem } from '../../../src/components/ShortenedLinkItem/ShortenedLinkItem';

describe('Tests in <ShortenedLinkItem/>', () => {

  test('should show the initial state', () => {
    const onRemoveLinkMock = vi.fn();
    const shortedLink = {
      id : "bit.ly/3ZRT7EC",
      link : "https://bit.ly/3ZRT7EC",
      long_url : "https://www.youtube.com/"
    }; 

    render(
      <ShortenedLinkItem
        shortLink={shortedLink}
        onRemoveLink={onRemoveLinkMock}
      />
    );

    const originalLink = screen.getByText('https://www.youtube.com/');
    const shortLink = screen.getByText('https://bit.ly/3ZRT7EC');

    expect(originalLink).toBeTruthy();
    expect(shortLink).toBeTruthy();
  });

  test('should simulate an error when the Copy button is pressed', async () => {
    const user = userEvent.setup();
    const onRemoveLinkMock = vi.fn();
    const shortedLink = {
      id : "bit.ly/3ZRT7EC",
      link : "https://bit.ly/3ZRT7EC",
      long_url : "https://www.youtube.com/"
    }; 
    
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue('');
    render(
      <ShortenedLinkItem
        shortLink={shortedLink}
        onRemoveLink={onRemoveLinkMock}
      />
    );
    
    await waitFor(async () => {
      const copyLinkBtn = screen.getByText('Copy');
      await user.click(copyLinkBtn);
      const copyErrorMsgBtn = screen.getByText('Copy error');
      expect(copyErrorMsgBtn).toBeTruthy();
    });
  });

  test('should copy the link when the Copy button is pressed', async () => {
    const user = userEvent.setup();
    const onRemoveLinkMock = vi.fn();
    const shortedLink = {
      id : "bit.ly/3ZRT7EC",
      link : "https://bit.ly/3ZRT7EC",
      long_url : "https://www.youtube.com/"
    }; 

    render(
      <ShortenedLinkItem
        shortLink={shortedLink}
        onRemoveLink={onRemoveLinkMock}
      />
    );

    const copyLinkBtn = screen.getByText('Copy');
    await user.click(copyLinkBtn);

    expect(screen.getByText('Copied!')).toBeTruthy();    
  });


  test('should call the onRemoveLink function with the link id', async () => {
    const user = userEvent.setup();
    const onRemoveLinkMock = vi.fn();
    const shortedLink = {
      id : "bit.ly/3ZRT7EC",
      link : "https://bit.ly/3ZRT7EC",
      long_url : "https://www.youtube.com/"
    };

    render(
      <ShortenedLinkItem
        shortLink={shortedLink}
        onRemoveLink={onRemoveLinkMock}
      />
    );

    const removeLinkBtn = screen.getByText('X');
    await user.click(removeLinkBtn);
    
    expect(onRemoveLinkMock).toHaveBeenCalledWith(shortedLink.id); 
  });

});