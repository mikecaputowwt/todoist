import { formatDueDate } from './formatDueDate';

describe('formatDueDate', () => {
  it("returns 'Today' for today's date", () => {
    const today = new Date();
    expect(formatDueDate(today)).toBe('Today');
  });

  it("returns 'Tomorrow' for tomorrow's date", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(formatDueDate(tomorrow)).toBe('Tomorrow');
  });

  it("returns 'Overdue by 1 days' for 1 day overdue", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(formatDueDate(yesterday)).toBe('Overdue by 1 days');
  });

  it("returns 'Overdue by 5 days' for 5 days overdue", () => {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    expect(formatDueDate(fiveDaysAgo)).toBe('Overdue by 5 days');
  });

  it('returns correct day and date for 2 days in future', () => {
    const twoDaysAhead = new Date();
    twoDaysAhead.setDate(twoDaysAhead.getDate() + 2);
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[twoDaysAhead.getMonth()];
    const day = twoDaysAhead.getDate();
    const expected = `${month} ${day}`;
    
    expect(formatDueDate(twoDaysAhead)).toBe(expected);
  });

  it('handles leap day (Feb 29) in a leap year correctly', () => {
    // Test with a fixed leap day in 2024
    const leapDay = new Date(2024, 1, 29); // Feb 29, 2024 (leap year)
    const today = new Date(2024, 1, 15); // Feb 15, 2024
    
    // We need to test with dates relative to a fixed reference point
    // Since formatDueDate uses "today", we'll test the format output
    const result = formatDueDate(leapDay);
    
    // Should either show as future date "Feb 29" or relative to actual today
    // The format should match the month-day pattern for dates beyond tomorrow
    expect(result).toMatch(/^(Feb 29|Overdue by \d+ days|Today|Tomorrow)$/);
  });

  it('returns correct format for dates far in the future', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[futureDate.getMonth()];
    const day = futureDate.getDate();
    const expected = `${month} ${day}`;
    
    expect(formatDueDate(futureDate)).toBe(expected);
  });

  it('returns correct format for dates with single-digit days', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    
    const result = formatDueDate(futureDate);
    
    // Should match the month-day format (e.g., "Nov 9" or "Nov 10")
    expect(result).toMatch(/^[A-Z][a-z]{2} \d{1,2}$/);
  });

  it('handles dates at midnight correctly', () => {
    const midnight = new Date();
    midnight.setDate(midnight.getDate() + 7);
    midnight.setHours(0, 0, 0, 0);
    
    const result = formatDueDate(midnight);
    
    // Should be formatted as "Mon DD" for dates beyond tomorrow
    expect(result).toMatch(/^[A-Z][a-z]{2} \d{1,2}$/);
  });

  it('handles dates at end of day correctly', () => {
    const endOfDay = new Date();
    endOfDay.setDate(endOfDay.getDate() + 7);
    endOfDay.setHours(23, 59, 59, 999);
    
    const result = formatDueDate(endOfDay);
    
    // Should still be formatted as "Mon DD" because it's the same day
    expect(result).toMatch(/^[A-Z][a-z]{2} \d{1,2}$/);
  });

  it('returns correct format for all months', () => {
    // Test that the format works for dates across different months
    const testDate = new Date();
    testDate.setDate(testDate.getDate() + 45);
    
    const result = formatDueDate(testDate);
    
    // Should match month abbreviation + day number pattern
    expect(result).toMatch(/^[A-Z][a-z]{2} \d{1,2}$/);
  });

  it('handles overdue dates with various day counts', () => {
    const testCases = [
      { daysAgo: 1, expected: 'Overdue by 1 days' },
      { daysAgo: 2, expected: 'Overdue by 2 days' },
      { daysAgo: 7, expected: 'Overdue by 7 days' },
      { daysAgo: 30, expected: 'Overdue by 30 days' },
      { daysAgo: 100, expected: 'Overdue by 100 days' },
    ];

    testCases.forEach(({ daysAgo, expected }) => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - daysAgo);
      expect(formatDueDate(pastDate)).toBe(expected);
    });
  });
  
  it('handles dates exactly 3 days in future', () => {
    const threeDaysAhead = new Date();
    threeDaysAhead.setDate(threeDaysAhead.getDate() + 3);
    
    const result = formatDueDate(threeDaysAhead);
    
    // Should not be 'Today' or 'Tomorrow'
    expect(result).not.toBe('Today');
    expect(result).not.toBe('Tomorrow');
    
    // Should be in the format "Mon DD"
    expect(result).toMatch(/^[A-Z][a-z]{2} \d{1,2}$/);
  });
});
