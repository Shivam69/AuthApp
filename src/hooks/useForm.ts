import { useState, useCallback } from 'react';

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface UseFormReturn<T extends Record<string, any>> {
  values: T;
  errors: FormErrors;
  isSubmitting: boolean;
  setValue: (key: keyof T, value: any) => void;
  setError: (key: string, error: string | undefined) => void;
  setErrors: (errors: FormErrors) => void;
  clearErrors: () => void;
  reset: () => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void> | void) => () => Promise<void>;
}

export function useForm<T extends Record<string, any>>(
  initialValues: T
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((key: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    const keyStr = String(key);
    if (errors[keyStr]) {
      setErrors(prev => ({ ...prev, [keyStr]: undefined }));
    }
  }, [errors]);

  const setError = useCallback((key: string, error: string | undefined) => {
    setErrors(prev => ({ ...prev, [key]: error }));
  }, []);

  const updateErrors = useCallback((newErrors: FormErrors) => {
    setErrors(newErrors);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => Promise<void> | void) => async () => {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        // Error handling is done in the onSubmit function
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values]
  );

  return {
    values,
    errors,
    isSubmitting,
    setValue,
    setError,
    setErrors: updateErrors,
    clearErrors,
    reset,
    handleSubmit,
  };
}