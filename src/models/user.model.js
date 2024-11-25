import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRoles, PasswordConfig } from "../constants.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [3, "Username must be at least 3 characters"],
        maxLength: [30, "Username cannot exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            "Please enter a valid email address"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [PasswordConfig.MIN_LENGTH, `Password must be at least ${PasswordConfig.MIN_LENGTH} characters`],
        maxLength: [PasswordConfig.MAX_LENGTH, `Password cannot exceed ${PasswordConfig.MAX_LENGTH} characters`],
        select: false // Don't include password in queries by default
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        maxLength: [50, "Full name cannot exceed 50 characters"]
    },
    avatar: {
        type: String,
        default: "https://api.dicebear.com/7.x/initials/svg" // Will be used with username
    },
    role: {
        type: String,
        enum: Object.values(UserRoles),
        default: UserRoles.USER
    },
    refreshToken: {
        type: String,
        select: false
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    }]
}, {
    timestamps: true
});

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// Hash password before saving
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(PasswordConfig.SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check password
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

// Virtual for avatar URL with username
userSchema.virtual("avatarUrl").get(function() {
    return `${this.avatar}?seed=${encodeURIComponent(this.username)}`;
});

export const User = mongoose.model("User", userSchema);
