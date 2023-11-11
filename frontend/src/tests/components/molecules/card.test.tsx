import { render } from '@testing-library/react';
import { Card } from '../../../components/molecules/card';

describe('Card', () => {
  it('renders the disabled(checked) state', () => {
    const { getByText } = render(<Card disabled={true}>Hello!</Card>);
    const card = getByText(/Hello!/i);
    expect(card.classList.contains('line-through'));
    expect(card.classList.contains('text-gray'));
    expect(card.classList.contains('bg-gray'));
  });

  it('stacks card items horizontally when horizontalStack is true', () => {
    const { getByText } = render(<Card horizontalStack={true}>Hello!</Card>);

    const card = getByText(/Hello!/i);
    expect(card.classList.contains('items-center')).toBeTruthy();
    expect(card.classList.contains('flex-col')).not.toBeTruthy();
  });

  it('stacks card items vertically when horizontalStack is false', () => {
    const { getByText } = render(<Card>Hello!</Card>);

    const card = getByText(/Hello!/i);
    expect(card.classList.contains('flex-col')).toBeTruthy();
    expect(card.classList.contains('items-center')).not.toBeTruthy();
  });
});
