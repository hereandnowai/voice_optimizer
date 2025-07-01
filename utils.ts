// utils.ts

/**
 * Triggers a file download in the browser.
 * @param content The string content of the file.
 * @param filename The desired name for the downloaded file.
 * @param contentType The MIME type of the file (defaults to 'text/plain;charset=utf-8;').
 */
export const downloadFile = (content: string, filename: string, contentType: string = 'text/plain;charset=utf-8;') => {
  const blob = new Blob([content], { type: contentType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

/**
 * Generates a formatted date string (YYYY-MM-DD).
 */
export const getCurrentDateString = (): string => {
  return new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
}

/**
 * Generates a timestamp string suitable for filenames.
 * e.g., 2023-10-27_14-30-55
 */
export const getTimestampFilenameSuffix = (): string => {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10);
  const timePart = now.toTimeString().slice(0, 8).replace(/:/g, '-');
  return `${datePart}_${timePart}`;
};
