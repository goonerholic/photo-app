import { createAction, createReducer } from 'typesafe-actions';

interface AuthState {
	signup: {
		username: string;
		password: string;
		passwordConfirm: string;
	};
	signin: {
		username: string;
		password: string;
	};
}

interface ChangeFieldInput {
	form: FormType;
	key: string;
	value: string;
}

type FormType = 'signin' | 'signup';

const prefix = '@auth';

const INITIALIZE_FORM = `${prefix}/INITIALIZE_FORM`;
const CHANGE_FIELD = `${prefix}/CHANGE_FIELD`;

export const initializeForm = createAction(
	INITIALIZE_FORM,
	(form: FormType) => form,
)();
export const changeField = createAction(
	CHANGE_FIELD,
	({ form, key, value }) => ({ form, key, value }),
);

const initialState: AuthState = {
	signup: {
		username: '',
		password: '',
		passwordConfirm: '',
	},
	signin: {
		username: '',
		password: '',
	},
};

const auth = createReducer<AuthState>(initialState)
	.handleAction(
		initializeForm,
		(state: AuthState, { payload: form }: { payload: FormType }) => ({
			...state,
			[form]: initialState[form],
		}),
	)
	.handleAction(
		changeField,
		(
			state: AuthState,
			{ payload: { form, key, value } }: { payload: ChangeFieldInput },
		) => ({
			...state,
			[form]: { ...state[form], [key]: value },
		}),
	);

export default auth;
