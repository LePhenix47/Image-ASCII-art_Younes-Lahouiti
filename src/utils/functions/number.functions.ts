/**
 * Generates a random number within a specified range.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @param {boolean} includeMin - Whether to include the minimum value in the range.
 * @param {boolean} includeMax - Whether to include the maximum value in the range.
 *
 * @returns {number} A random number within the specified range.
 */
function getRandomNumber(
  min: number,
  max: number,
  includeMin: boolean = true,
  includeMax: boolean = true
): number {
  const hasInvalidArgument: boolean = min > max || max < min;
  if (hasInvalidArgument) {
    throw new Error(
      `Unexpected error occured in the passed argument values: min > max or max < min`
    );
  }

  const mustIncludeBoth: boolean = includeMin && includeMax;

  const mustIncludeOnlyMin: boolean = includeMin && !includeMax;

  const mustIncludeOnlyMax: boolean = !includeMin && includeMax;

  if (mustIncludeBoth) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else if (mustIncludeOnlyMin) {
    return Math.floor(Math.random() * (max - min)) + min;
  } else if (mustIncludeOnlyMax) {
    return Math.floor(Math.random() * (max - min)) + min + 1;
  } else {
    //We don't include either
    return Math.floor(Math.random() * (max - min - 1)) + min + 1;
  }
}
