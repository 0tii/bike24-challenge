import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import ErrorComponent from '@/components/ErrorBoundary/ErrorComponent';

describe('Error Boundary', () => {
  it('displays fallback component on error', () => {
    const { getByText } = render(
      <ErrorBoundary fallback={<ErrorComponent />}>
        <DummyComponent />
      </ErrorBoundary>
    );

    const text = getByText('Oops');
    expect(text).toBeInTheDocument();
  });

  const DummyComponent = () => {
    throw 'test';
    return <h1>Dummy</h1>;
  };
});
