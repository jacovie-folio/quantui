/**
 * Formats a number for display.
 * - If the number has 2 or fewer decimal places inherently, it's returned as a string as is.
 * - If the number has more than 2 decimal places, it's rounded to 2 decimal places using .toFixed().
 *
 * @param num The number to format.
 * @returns A string representation of the number according to the rules.
 * @example
 * formatNumberForDisplay(5);      // "5"
 * formatNumberForDisplay(0.5);     // "0.5"
 * formatNumberForDisplay(1.25);    // "1.25"
 * formatNumberForDisplay(100.00);  // "100" (Note: 100.00 is just 100)
 * formatNumberForDisplay(0.6666); // "0.67"
 * formatNumberForDisplay(1.2345);  // "1.23"
 * formatNumberForDisplay(1/3);     // "0.33"
 * formatNumberForDisplay(NaN);     // "NaN"
 */
export function formatNumberForDisplay(num: number): string {
  // Handle non-finite numbers (NaN, Infinity)
  if (!Number.isFinite(num)) {
    return String(num);
  }

  // Check if the number *already* has 2 or fewer decimal places.
  // We can do this by seeing if rounding it to 2 decimal places *changes* its value.
  // Using Math.round is often more reliable for comparison than parseFloat(toFixed()).
  const roundedToTwoDecimals = Math.round(num * 100) / 100;

  if (num === roundedToTwoDecimals) {
    // If the original number is identical to the rounded version,
    // it means it had 0, 1, or 2 decimal places to begin with.
    // Return it as a standard string.
    return num.toString();
  } else {
    // If the number changed value when rounded to 2 decimals,
    // it means it originally had more than 2 decimal places.
    // Return the number formatted to exactly 2 decimal places.
    return num.toFixed(2);
  }
}
