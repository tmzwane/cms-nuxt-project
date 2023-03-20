export function useUtilities() {
  function isEmpty(value) {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  }

  function truncateWords(text, n = 50) {
    let textSplit = text.split(" ");
    return textSplit.length > n
      ? textSplit.splice(0, n).join(" ") + "..."
      : text;
  }

  function truncateChars(text, n = 100) {
    return text.length > n ? text.substr(0, n - 1) + "..." : text;
  }

  return {
    isEmpty,
    truncateWords,
    truncateChars,
  };
}
