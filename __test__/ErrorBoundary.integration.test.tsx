import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import ErrorComponent from '@/components/ErrorBoundary/ErrorComponent';

describe('Error Boundary', () => {
  it('displays fallback component on error', () => {
    // we expect the error, hence we dont need it printed to console.
    const exceptionSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { getByText } = render(
      <ErrorBoundary fallback={<ErrorComponent />}>
        <DummyComponent />
      </ErrorBoundary>
    );

    const text = getByText('Oops');
    expect(text).toBeInTheDocument();

    exceptionSpy.mockRestore();
  });

  const DummyComponent = () => {
    throw 'test';
    return <h1>Dummy</h1>;
  };
});
