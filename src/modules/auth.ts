import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChangeFieldInput {
	key: 'username' | 'password' | 'passwordConfirm';
	value: string;
}

interface AuthState {
	username: string;
	password: string;
	passwordConfirm: string;
}

const initialState: AuthState = {
	username: '',
	password: '',
	passwordConfirm: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		initializeForm(state) {
			state = initialState;
		},
		changeField: {
			reducer: (
				state,
				{ payload: { key, value } }: PayloadAction<ChangeFieldInput>,
			) => {
				state[key] = value;
			},
			prepare: ({ key, value }: ChangeFieldInput) => ({
				payload: { key, value },
			}),
		},
	},
});

const { actions, reducer: auth } = authSlice;
export const { initializeForm, changeField } = actions;
export default auth;

// interface AuthState {
// 	signup: {
// 		username: string;
// 		password: string;
// 		passwordConfirm: string;
// 	};
// 	signin: {
// 		username: string;
// 		password: string;
// 	};
// }

// interface ChangeFieldInput {
// 	form: FormType;
// 	key: string;
// 	value: string;
// }

// type FormType = 'signin' | 'signup';

// const prefix = '@auth';

// // const INITIALIZE_FORM = `${prefix}/INITIALIZE_FORM`;
// // const CHANGE_FIELD = `${prefix}/CHANGE_FIELD`;

// export const initializeForm = createAction(
// 	`${prefix}/INITIALIZE_FORM`,
// 	(form: FormType) => ({ payload: form }),
// );

// export const changeField = createAction(
// 	`${prefix}/CHANGE_FIELD`,
// 	({ form, key, value }: ChangeFieldInput) => ({
// 		payload: { form, key, value },
// 	}),
// );

// const initialState: AuthState = {
// 	signin: {
// 		username: '',
// 		password: '',
// 	},
// 	signup: {
// 		username: '',
// 		password: '',
// 		passwordConfirm: '',
// 	},
// };

// const auth = createReducer(initialState, (builder) =>
// 	builder
// 		.addCase(initializeForm, (state, { payload: form }) => ({
// 			...state,
// 			[form]: initialState[form],
// 		}))
// 		.addCase(changeField, (state, { payload: { form, key, value } }) => ({
// 			...state,
// 			[form]: { ...state[form], [key]: value },
// 		})),
// );

// export default auth;

// export const initializeForm = createAction(
// 	INITIALIZE_FORM,
// 	(form: FormType) => form,
// )();
// export const changeField = createAction(
// 	CHANGE_FIELD,
// 	({ form, key, value }) => ({ form, key, value }),
// );

// const initialState: AuthState = {
// 	signup: {
// 		username: '',
// 		password: '',
// 		passwordConfirm: '',
// 	},
// 	signin: {
// 		username: '',
// 		password: '',
// 	},
// };

// const auth = createReducer<AuthState>(initialState)
// 	.handleAction(
// 		initializeForm,
// 		(state: AuthState, { payload: form }: { payload: FormType }) => ({
// 			...state,
// 			[form]: initialState[form],
// 		}),
// 	)
// 	.handleAction(
// 		changeField,
// 		(
// 			state: AuthState,
// 			{ payload: { form, key, value } }: { payload: ChangeFieldInput },
// 		) => ({
// 			...state,
// 			[form]: { ...state[form], [key]: value },
// 		}),
// 	);

// export default auth;
