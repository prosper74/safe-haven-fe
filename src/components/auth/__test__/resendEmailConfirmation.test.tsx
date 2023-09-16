// src/forgotPassword.test.ts
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ResendEmailConfirmation from '../resendEmailConfirmation';

const formInputValues = [
  {
    label: 'Email',
    correctTestValue: 'john@gmail.com',
  },
];

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn().mockImplementation(() => ({})),
    useDispatch: () => jest.fn(),
  };
});

describe('renders heading text', () => {
  it('renders a heading', () => {
    // @ts-ignore
    render(<ResendEmailConfirmation />);

    const heading = screen.getByRole('heading', {
      name: /Resend Confirmation Email/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders a paragraph', () => {
    // @ts-ignore
    render(<ResendEmailConfirmation />);

    const paragraph = screen.getByText('Input your email below');

    expect(paragraph).toBeInTheDocument();
  });

  it('Should render the form input', () => {
    // @ts-ignore
    render(<ResendEmailConfirmation />);
    formInputValues.forEach((value) => {
      expect(screen.getByLabelText(value.label)).toBeInTheDocument();
    });
  });

  it('Should render submit button', async () => {
    // @ts-ignore
    render(<ResendEmailConfirmation />);

    //check for submit button
    const button = screen.getByRole('button', { name: 'Resend' });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('Should submit when inputs are filled and submit button clicked', async () => {
    // @ts-ignore
    render(<ResendEmailConfirmation />);

    //check for submit button
    const submitButton = screen.getByRole('button', { name: 'Resend' });

    formInputValues.forEach((mockValue) => {
      const input = screen.getByLabelText(mockValue.label);
      fireEvent.change(input, {
        target: { value: mockValue.correctTestValue },
      });
    });

    fireEvent.click(submitButton);

    expect(
      await screen.findByRole('button', { name: 'Resend' })
    ).toBeInTheDocument();
  });
});
