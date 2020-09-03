export type AsyncState<T, E = any> = {
	loading: boolean;
	data: T | null;
	error: E | null;
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
	error: <T, E>(error: E): AsyncState<T, E> => ({
		loading: false,
		data: null,
		error: error,
	}),
};
