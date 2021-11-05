import React from 'react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, logDOM} from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from "react-redux";
import LoginForm from '../LoginForm';
import { createStore } from "redux";
import reducer, { initialState } from "../../reducers/session";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

function renderWithProviders(ui, { reduxState } = {}) {
  const store = createStore(reducer, reduxState || initialState);
  return render(<Provider store={store}>{ui}</Provider>);
}

test('Render login form', () => {
  renderWithProviders(<LoginForm />);
  expect(screen.getByText('Please log in below')).toBeInTheDocument();
  expect(screen.getByText('Username')).toBeInTheDocument();
  expect(screen.getByText('Sign in')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();
  expect(screen.getByText('Forget your password?')).toBeInTheDocument();
  expect(screen.getByText('Sign up!')).toBeInTheDocument();
});

test('Log in form initial state check...', () => {
  renderWithProviders(<LoginForm />);
  expect(screen.getByText('Sign in').closest('button')).toHaveAttribute('disabled');
  expect(screen.getByPlaceholderText('Please enter username...').closest('input')).toHaveValue('');
  expect(screen.getByPlaceholderText('Please enter password...').closest('input')).toHaveValue('');
  expect(screen.getByPlaceholderText('Please enter password...').closest('input').getAttribute('type')).toEqual('password');
})

test('Username error check', () => {
  renderWithProviders(<LoginForm />);
  userEvent.type(screen.getByPlaceholderText('Please enter username...').closest('input'), '1111');
  userEvent.type(screen.getByPlaceholderText('Please enter password...').closest('input'), '11111111');
  expect(screen.getByPlaceholderText('Please enter username...').closest('input')).toHaveValue('1111');
  expect(screen.getByPlaceholderText('Please enter password...').closest('input')).toHaveValue('11111111');
  expect(screen.getByText('Username')).toHaveClass('Mui-error');;
  expect(screen.getByText('Sign in').closest('button')).toHaveAttribute('disabled');
  userEvent.type(screen.getByPlaceholderText('Please enter username...').closest('input'), 'abceef---');
  expect(screen.getByText('Username')).toHaveClass('Mui-error');
  expect(screen.getByText('Sign in').closest('button')).toHaveAttribute('disabled');
});

test('Password error check', () => {
  renderWithProviders(<LoginForm />);
  userEvent.type(screen.getByPlaceholderText('Please enter username...').closest('input'), 'abcdef');
  userEvent.type(screen.getByPlaceholderText('Please enter password...').closest('input'), '11111');
  expect(screen.getByPlaceholderText('Please enter username...').closest('input')).toHaveValue('abcdef');
  expect(screen.getByPlaceholderText('Please enter password...').closest('input')).toHaveValue('11111');
  expect(screen.getByPlaceholderText('Please enter password...').closest('input').getAttribute('aria-invalid')).toEqual("true");
  expect(screen.getByText('Sign in').closest('button')).toHaveAttribute('disabled');
  userEvent.type(screen.getByPlaceholderText('Please enter password...').closest('input'), 'abceef---');
  expect(screen.getByPlaceholderText('Please enter password...').closest('input').getAttribute('aria-invalid')).toEqual("true");
  expect(screen.getByText('Sign in').closest('button')).toHaveAttribute('disabled');
});

const server = setupServer(
  rest.post('http://localhost:3001/api/login', (req, res, ctx) => {
    const reqObj = JSON.parse(req.body);
    if (reqObj.username === 'testuser' && reqObj.password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({ 
          username: 'testuser',
          fullname: 'Test User'
        })
      )
    }
    return res(
      ctx.status(401),
      ctx.json({ 
        status: 'error',
        error: 'incorrect username or password.'
      }),
    )
  })
)
beforeAll(() => server.listen());

test('Incorrect Login check', async () => {
  renderWithProviders(<LoginForm />);
  userEvent.type(screen.getByPlaceholderText('Please enter username...').closest('input'), 'testuser1');
  userEvent.type(screen.getByPlaceholderText('Please enter password...').closest('input'), 'password1');
  userEvent.click(screen.getByText('Sign in').closest('button'));

  await screen.findByTestId('snackbar')
  const snackbar = screen.queryByTestId('snackbar')
  expect(snackbar).toBeInTheDocument();

});

test('Correct Login check', async () => {
  renderWithProviders(<LoginForm />);
  userEvent.type(screen.getByPlaceholderText('Please enter username...').closest('input'), 'testuser');
  userEvent.type(screen.getByPlaceholderText('Please enter password...').closest('input'), 'password');
  userEvent.click(screen.getByText('Sign in').closest('button'));

  // await screen.findByTestId('snackbar')
  const snackbar = screen.queryByTestId('snackbar')
  expect(snackbar).toBeNull()

});



