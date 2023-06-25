import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrashBinIcon from '@/svg/TrashBinIcon';

describe('Trash Bin Icon', () => {
  it('renders', () => {
    const container = render(<TrashBinIcon />);

    expect(container).toMatchSnapshot();
  });
});
