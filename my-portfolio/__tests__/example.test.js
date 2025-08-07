import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SkipLink from '../components/SkipLink';

// Simple example test to verify the test setup is working
describe('Example Test Suite', () => {
  it('should render a simple component', () => {
    // Create a simple test component
    const TestComponent = () => (
      <div>
        <h1>Hello World</h1>
        <p>This is a test component</p>
      </div>
    );

    render(<TestComponent />);

    // Test that elements are rendered
    expect(screen.getByRole('heading', { name: /hello world/i })).toBeInTheDocument();
    expect(screen.getByText(/this is a test component/i)).toBeInTheDocument();
  });

  it('should perform basic math operations', () => {
    // Basic test to verify Jest is working
    expect(2 + 2).toBe(4);
    expect(10 - 5).toBe(5);
    expect(3 * 4).toBe(12);
    expect(8 / 2).toBe(4);
  });

  it('should work with arrays and objects', () => {
    const testArray = [1, 2, 3, 4, 5];
    const testObject = { name: 'Test', value: 42 };

    expect(testArray).toHaveLength(5);
    expect(testArray).toContain(3);
    expect(testObject).toHaveProperty('name', 'Test');
    expect(testObject.value).toBe(42);
  });
});

// Test for actual project component
describe('SkipLink Component', () => {
  it('should render skip link with correct text', () => {
    render(<SkipLink />);
    
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('should have correct accessibility attributes and styling', () => {
    render(<SkipLink />);
    
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toHaveClass('fixed', 'top-4', 'left-4');
    expect(skipLink).toHaveClass('-translate-y-20'); // Initially hidden
  });

  it('should handle focus and blur events', async () => {
    const user = userEvent.setup();
    render(<SkipLink />);
    
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    
    // Initially should be translated up (hidden)
    expect(skipLink).toHaveClass('-translate-y-20');
    
    // Focus the link
    await user.tab();
    expect(skipLink).toHaveFocus();
  });
});