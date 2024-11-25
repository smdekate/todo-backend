export const DB_NAME = "todo-app";

export const TodoStatus = {
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED"
};

export const TodoPriority = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH"
};

export const UserRoles = {
    USER: "USER",
    ADMIN: "ADMIN"
};

export const PasswordConfig = {
    SALT_ROUNDS: 10,
    MIN_LENGTH: 8,
    MAX_LENGTH: 128
};

export const TokenExpiry = {
    ACCESS_TOKEN: "1d",
    REFRESH_TOKEN: "7d"
};
