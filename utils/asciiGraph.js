function generateAsciiGraph(input) {
  if (!input) return '';

  // Calculate height values (a=0, b=1, etc.)
  const getHeight = (char) => char.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);

  // Convert input to heights
  const heights = input.split('').map(getHeight);
  const maxHeight = Math.max(...heights);

  // Create canvas with extra height for better visualization
  const canvas = Array(maxHeight + 1).fill().map(() => Array(input.length * 3).fill(' '));

  // Plot the line graph
  for (let i = 0; i < heights.length; i++) {
    const x = i * 3; // Current x position (multiplied by 3 for spacing)
    const y = maxHeight - heights[i]; // Invert y-axis so 0 is at bottom

    // Mark point with small circle
    canvas[y][x] = 'o';

    // Connect to next point if it exists
    if (i < heights.length - 1) {
      const nextHeight = heights[i + 1];
      const nextY = maxHeight - nextHeight;
      
      if (nextY === y) {
        // Same level - draw horizontal line
        canvas[y][x + 1] = '_';
        canvas[y][x + 2] = '_';
      } else {
        // Different level - draw diagonal
        const isGoingUp = nextY < y;
        if (isGoingUp) {
          canvas[y - 1][x + 1] = '/';
          if (Math.abs(nextY - y) > 1) {
            canvas[y - 2][x + 2] = '/';
            // Fill vertical space with |
            for (let j = y - 3; j > nextY; j--) {
              canvas[j][x + 2] = '|';
            }
          }
        } else {
          canvas[y + 1][x + 1] = '\\';
          if (Math.abs(nextY - y) > 1) {
            canvas[y + 2][x + 2] = '\\';
            // Fill vertical space with |
            for (let j = y + 3; j < nextY; j++) {
              canvas[j][x + 2] = '|';
            }
          }
        }
      }
    }
  }

  // Convert canvas to string, removing empty lines
  return canvas
    .map(row => row.join(''))
    .filter(row => row.trim() !== '')
    .join('\n');
}

module.exports = { generateAsciiGraph }; 