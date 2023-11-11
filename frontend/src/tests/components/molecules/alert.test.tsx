import { render } from '@testing-library/react';
import { Alert } from '../../../components/molecules/alert';

describe('Alert', () => {
  it('should inform the user of the error', () => {
    const { getByText } = render(<Alert error='A problem occurred' />);
    expect(getByText(/A problem occurred/i)).toBeInTheDocument();
  });
});
