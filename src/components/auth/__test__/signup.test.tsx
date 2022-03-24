// src/signup.test.ts
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../Signup';

const formInputValues = [
  {
    label: 'Full name',
    correctTestValue: 'John Doe',
  },
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

describe('new user signup form', () => {
  it('Should render all form inputs', () => {
    // @ts-ignore
    render(<Signup />);
    formInputValues.forEach((value) => {
      expect(screen.getByLabelText(value.label)).toBeInTheDocument();
    });
  });

  it('Should render submit button', async () => {
    // @ts-ignore
    render(<Signup />);

    //check for submit button
    const button = screen.getByRole('button', { name: 'Sign up' });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('Should submit when inputs are filled and submit button clicked', async () => {
    // @ts-ignore
    render(<Signup />);

    //check for submit button
    const submitButton = screen.getByRole('button', { name: 'Sign up' });

    formInputValues.forEach((mockValue) => {
      const input = screen.getByLabelText(mockValue.label);
      fireEvent.change(input, {
        target: { value: mockValue.correctTestValue },
      });
    });

    fireEvent.click(submitButton);

    expect(
      await screen.findByRole('button', { name: 'Submitting' })
    ).toBeInTheDocument();
  });
});
