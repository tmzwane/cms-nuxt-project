export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const slugIdGenerator = (slugIdLength = 7, hasNumbers = true) => {
  const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let slugId = "";

  let chars = alpha;
  hasNumbers ? (chars += numbers) : "";

  for (let i = 0; i < slugIdLength; i++) {
    slugId += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return slugId;
};
