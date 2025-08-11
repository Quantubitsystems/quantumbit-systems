export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

export const validateNumber = (value: string): boolean => {
  return !isNaN(Number(value)) && Number(value) >= 0;
};

export const validateUrl = (url: string): boolean => {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export interface ValidationError {
  field: string;
  message: string;
}

export const validateContactForm = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!validateRequired(data.firstName)) {
    errors.push({ field: 'firstName', message: 'First name is required' });
  }

  if (!validateRequired(data.lastName)) {
    errors.push({ field: 'lastName', message: 'Last name is required' });
  }

  if (!validateRequired(data.email)) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email' });
  }

  if (!validateRequired(data.phone)) {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else if (!validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
  }

  if (!validateRequired(data.message)) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (!validateMinLength(data.message, 10)) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  }

  return errors;
};