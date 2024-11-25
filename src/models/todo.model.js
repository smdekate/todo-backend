import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxLength: [50, "Title cannot be more than 50 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxLength: [300, "Description cannot be more than 300 characters"]
    },
    status: {
        type: String,
        enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
        default: "PENDING"
    },
    priority: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        default: "MEDIUM"
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"]
    },
    tags: [{
        type: String,
        trim: true
    }],
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Add indexes for better query performance
todoSchema.index({ status: 1, dueDate: 1 });
todoSchema.index({ isCompleted: 1 });

// Middleware to update status when isCompleted changes
todoSchema.pre('save', function(next) {
    if (this.isModified('isCompleted') && this.isCompleted) {
        this.status = "COMPLETED";
    }
    next();
});

// Instance method to check if todo is overdue
todoSchema.methods.isOverdue = function() {
    return !this.isCompleted && this.dueDate < new Date();
};

// Static method to find overdue todos
todoSchema.statics.findOverdueTodos = function() {
    return this.find({
        isCompleted: false,
        dueDate: { $lt: new Date() }
    });
};

export const Todo = mongoose.model("Todo", todoSchema);
