export type AsyncState<T> = {
  loading: boolean;
  data: T | null;
  error: string | null;
};

export const asyncState = {
  initial: <T>(initialData?: T): AsyncState<T> => ({
    loading: false,
    data: initialData || null,
    error: null,
  }),
  load: <T>(data?: T): AsyncState<T> => ({
    loading: true,
    data: data || null,
    error: null,
  }),
  success: <T>(data: T): AsyncState<T> => ({
    loading: false,
    data,
    error: null,
  }),
  error: <T>(error: Error): AsyncState<T> => ({
    loading: false,
    data: null,
    error: error.message,
  }),
};
