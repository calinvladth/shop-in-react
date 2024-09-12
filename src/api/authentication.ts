import pb from "../utils/pb";

type AuthenticationForm = {
    email: string;
    password: string
}

type AuthenticationFormError = {
    email: boolean;
    password: boolean;
}

async function login({ data, cb, cbError }: { data: AuthenticationForm, cb: () => void, cbError: () => void }) {
    try {
        await pb.collection('users').authWithPassword(data.email, data.password)

        cb()
    } catch (err) {
        cbError()
    }

}

async function register({ data, cb, cbError }: { data: AuthenticationForm, cb: () => void, cbError: () => void }) {
    try {
        await pb.collection('users').create({ ...data, passwordConfirm: data.password });
        await pb.collection('users').authWithPassword(data.email, data.password)

        cb()
    } catch (err) {
        cbError()
    }

}

async function logout(cb: () => void) {
    try {
        pb.authStore.clear()
        cb()
    } catch (err) {
        // errorHandler(err)
    }

}

export type {
    AuthenticationForm,
    AuthenticationFormError
}

export const AuthenticationApi = {
    login,
    register,
    logout
}