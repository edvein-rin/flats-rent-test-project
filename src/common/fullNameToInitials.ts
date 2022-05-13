export const fullNameToInitials = (fullName: string): string | undefined => {
  const words = fullName.trim().split(' ');

  if (words.length < 2) return undefined;
  return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
};

export default fullNameToInitials;
