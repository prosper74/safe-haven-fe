// src/complete.test.ts
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Complete from '../Complete';

describe('Home', () => {
  it('renders a heading', () => {
    // @ts-ignore
    render(<Complete />);

    const heading = screen.getByRole('heading', {
      name: /Account Created Successfully!!!/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders a paragraph', () => {
    // @ts-ignore
    render(<Complete />);

    const paragraph = screen.getByText(
      'Kindly check your email inbox to verify your email'
    );

    expect(paragraph).toBeInTheDocument();
  });

  it('Should render cancel button', async () => {
    // @ts-ignore
    render(<Complete />);

    //check for submit button
    const button = screen.getByRole('button', { name: 'Got it' });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
});
