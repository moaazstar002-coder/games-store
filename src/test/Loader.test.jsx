import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Loader from '../components/Loader';

describe('Loader', () => {
  it('announces its busy state to assistive technology', () => {
    render(<Loader />);

    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
