interface User{
    name: string,
    password?: string,
    role?: "USER" | "ADMIN",
}

export default User;