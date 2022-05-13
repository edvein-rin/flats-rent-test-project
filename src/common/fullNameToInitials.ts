export const fullNameToInitials = (fullName: string): string => {
  const words = fullName.trim().split(' ');

  if (words.length < 2) return 'U';
  return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
};

export default fullNameToInitials;
