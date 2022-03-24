// src/forgotPassword.test.ts
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ForgotPassword from '../ForgotPassword';

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

describe('Forgot Password Form', () => {
  it('renders a heading', () => {
    // @ts-ignore
    render(<ForgotPassword />);

    const heading = screen.getByRole('heading', {
      name: /Forgot Password?/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders a paragraph', () => {
    // @ts-ignore
    render(<ForgotPassword />);

    const paragraph = screen.getByText(
      'Kindly input your registered email address, and we will send an email with instructions on how to reset your password'
    );

    expect(paragraph).toBeInTheDocument();
  });

  it('Should the form input', () => {
    // @ts-ignore
    render(<ForgotPassword />);
    formInputValues.forEach((value) => {
      expect(screen.getByLabelText(value.label)).toBeInTheDocument();
    });
  });

  it('Should render submit button', async () => {
    // @ts-ignore
    render(<ForgotPassword />);

    //check for submit button
    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('Should submit when inputs are filled and submit button clicked', async () => {
    // @ts-ignore
    render(<ForgotPassword />);

    //check for submit button
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    formInputValues.forEach((mockValue) => {
      const input = screen.getByLabelText(mockValue.label);
      fireEvent.change(input, {
        target: { value: mockValue.correctTestValue },
      });
    });

    fireEvent.click(submitButton);

    expect(
      await screen.findByRole('button', { name: 'Submit' })
    ).toBeInTheDocument();
  });
});
