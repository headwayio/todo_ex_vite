import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';
import { PropsWithChildren } from 'react';
import { useProject } from '../../../hooks/use_project';
import { errorMocks, queryMocks } from '../../apollo_mocks';

function getHookWrapper(
  mocks: Array<MockedResponse<Record<string, any>, Record<string, any>>>
) {
  const wrapper = ({ children }: PropsWithChildren) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
  const { result, waitForNextUpdate } = renderHook(() => useProject(), {
    wrapper,
  });
  // Test the initial state of the request
  expect(result.current.loading).toBeTruthy();
  expect(result.current.error).toBeUndefined();
  expect(result.current.projects).toBeUndefined();
  return { result, waitForNextUpdate };
}

describe('useProject', () => {
  it('renders projects', async () => {
    const { result, waitForNextUpdate } = getHookWrapper(queryMocks);

    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.projects).toEqual([
      {
        id: '1',
        name: 'Buck',
        user: { id: 1, name: 'John Doe' },
        tasks: [],
      },
    ]);
  });

  it('should delete a project', async () => {
    const { result, waitForNextUpdate } = getHookWrapper(queryMocks);

    await waitForNextUpdate();

    result.current.removeProject(1);
    await waitForNextUpdate();

    expect(result.current.projects).toEqual([]);
  });

  it('should add a project', async () => {
    const { result, waitForNextUpdate } = getHookWrapper(queryMocks);

    await waitForNextUpdate();

    result.current.addProject({
      variables: {
        name: 'My Tasks',
        user_id: 1,
      },
    });
    await waitForNextUpdate();

    expect(result.current.projects).toEqual([
      {
        id: '1',
        name: 'Buck',
        user: { id: 1, name: 'John Doe' },
        tasks: [],
      },
      {
        id: '2',
        name: 'My Tasks',
        user: { id: 1, name: 'John Doe' },
        tasks: [],
      },
    ]);
  });

  it('should return an error when request fails', async () => {
    const { result, waitForNextUpdate } = getHookWrapper(errorMocks);

    await waitForNextUpdate();

    expect(result.current.error?.message).toEqual('Something went wrong');
  });
});
