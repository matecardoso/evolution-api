// Example test to validate Jest configuration
// This test ensures that the Jest setup is working correctly

describe('Jest Configuration', () => {
  it('should be able to run TypeScript tests', () => {
    const message = 'Jest is working with TypeScript!';
    expect(message).toBe('Jest is working with TypeScript!');
  });

  it('should have access to test environment variables', () => {
    // Set environment variables for testing
    process.env.NODE_ENV = 'test';
    process.env.DATABASE_PROVIDER = 'postgresql';
    
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.DATABASE_PROVIDER).toBe('postgresql');
  });

  it('should support async/await syntax', async () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve('async test completed'), 10);
    });
    
    const result = await promise;
    expect(result).toBe('async test completed');
  });

  it('should support ES6 features', () => {
    const array = [1, 2, 3, 4, 5];
    const doubled = array.map(x => x * 2);
    
    expect(doubled).toEqual([2, 4, 6, 8, 10]);
  });

  it('should be able to mock functions', () => {
    const mockFunction = jest.fn();
    mockFunction('test argument');
    
    expect(mockFunction).toHaveBeenCalledWith('test argument');
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});