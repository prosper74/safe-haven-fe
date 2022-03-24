// src/signup.test.ts
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../login';

const formInputValues = [
  {
    label: 'Email',
    correctTestValue: 'john@gmail.com',
  },
  {
    label: 'Password',
    correctTestValue: 'ASrty6655#$%f',
  },
];

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn().mockImplementation(() => ({})),
    useDispatch: () => jest.fn(),
  };
});

describe('user login form', () => {
  it('Should render all form inputs', () => {
    // @ts-ignore
    render(<Login />);
    formInputValues.forEach((value) => {
      expect(screen.getByLabelText(value.label)).toBeInTheDocument();
    });
  });

  it('Should render submit button', async () => {
    // @ts-ignore
    render(<Login />);

    //check for submit button
    const button = screen.getByRole('button', { name: 'Login' });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('Should submit when inputs are filled and submit button clicked', async () => {
    // @ts-ignore
    render(<Login />);

    //check for submit button
    const submitButton = screen.getByRole('button', { name: 'Login' });

    formInputValues.forEach((mockValue) => {
      const input = screen.getByLabelText(mockValue.label);
      fireEvent.change(input, {
        target: { value: mockValue.correctTestValue },
      });
    });

    fireEvent.click(submitButton);

    expect(
      await screen.findByRole('button', { name: 'Loading' })
    ).toBeInTheDocument();
  });
});
