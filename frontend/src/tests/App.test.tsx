import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import App from '../App';
import { queryMocks } from './apollo_mocks';

describe('App', () => {
  beforeEach(async () => {
    render(
      <MockedProvider mocks={queryMocks} addTypename={true}>
        <App />
      </MockedProvider>
    );
  });

  it('should render the page with projects', async () => {
    expect(screen.queryByText(/Projects/i)).not.toBe(null);
    expect(await screen.findByText(/Buck/i)).toBeInTheDocument();
    expect(await screen.findByText(/JD/i)).toBeInTheDocument();
  });

  it('should allow the user to add a project', async () => {
    act(() => fireEvent.click(screen.getByText('+ Add Project')));
    expect(await screen.findByText(/New Project/i)).toBeInTheDocument();

    // Fill out the form name
    act(() =>
      fireEvent.change(screen.getByLabelText(/Project Name/i), {
        target: { value: 'My Tasks' },
      })
    );

    // Submit form
    act(() => fireEvent.submit(screen.getByLabelText('Add a new project')));

    expect(await screen.findByText(/My Tasks/i)).toBeInTheDocument();
  });
});
