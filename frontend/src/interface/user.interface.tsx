interface User{
    name: String,
    password: String,
    role: "USER" | "ADMIN",
}

export default User;