import React from 'react';
import { render } from '@testing-library/react';
import { TagDisplay } from '../components/TagDisplay';

describe('<TagDisplay />', () => {
  it('renders nothing when no tags are provided', () => {
    const { container } = render(<TagDisplay tags={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when tags is null', () => {
    const { container } = render(<TagDisplay tags={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders tags correctly', () => {
    const tags = [
      { name: 'urgent', color: '#ff5858' },
      { name: 'personal', color: '#3b82f6' },
    ];
    
    const { getAllByText } = render(<TagDisplay tags={tags} />);
    
    expect(getAllByText('urgent').length).toBe(1);
    expect(getAllByText('personal').length).toBe(1);
  });

  it('applies correct color styles to tags', () => {
    const tags = [
      { name: 'urgent', color: '#ff5858' },
    ];
    
    const { getByText } = render(<TagDisplay tags={tags} />);
    const tagElement = getByText('urgent');
    
    expect(tagElement).toHaveStyle('background-color: #ff5858');
  });

  it('uses default color when no color is provided', () => {
    const tags = [
      { name: 'no-color' },
    ];
    
    const { getByText } = render(<TagDisplay tags={tags} />);
    const tagElement = getByText('no-color');
    
    expect(tagElement).toHaveStyle('background-color: #808080');
  });
});