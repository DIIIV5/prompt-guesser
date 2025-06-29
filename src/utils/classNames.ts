/**
 * Utility function to conditionally join class names
 * @param classes - Array of class names or objects with boolean values
 * @returns Joined class names string
 */
export const classNames = (...classes: (string | boolean | undefined | null | Record<string, boolean>)[]): string => {
  return classes
    .map(cls => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}; 