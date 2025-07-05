export type User = {
    username: string
}

export type RegisterForm = Pick<User, 'username'> & {
    password: string
    password_confirmation: string
}

export type LoginForm = Pick<User, 'username'> & {
    password: string
}