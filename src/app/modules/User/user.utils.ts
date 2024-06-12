export function validatePassword(password: string): string | undefined {
  if (password.length < 8) {
    return 'Password should be at least 8 characters long';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password should contain at least 1 uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password should contain at least 1 lowercase letter';
  }
  if (!/\d/.test(password)) {
    return 'Password should contain at least 1 digit';
  }
  if (!/\W/.test(password)) {
    return 'Password should contain at least 1 special character';
  }
  return undefined; // No validation error
}
