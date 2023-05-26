import { render } from '@testing-library/react';
import { Avatar } from '../../../components/atoms/avatar';

describe('Avatar', () => {
  it('should truncate given name to two initials', () => {
    const { queryByText, getByText } = render(<Avatar initials='John Smith' />);
    expect(getByText(/JS/i)).toBeInTheDocument();
    expect(queryByText(/John Smith/i)).not.toBeInTheDocument();
  });

  it('should only show one initial if given single name', () => {
    const { queryByText, getByText } = render(<Avatar initials='Zelda' />);
    expect(getByText('Z')).toBeInTheDocument();
    expect(queryByText('Zelda')).not.toBeInTheDocument();
  });
});
