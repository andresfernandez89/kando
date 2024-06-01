import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required"],
      minLength: [3, "Firstname must be at least 3 characters"],
      maxLength: [20, "Firstname must be at most 20 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required"],
      minLength: [3, "Lastname must be at least 3 characters"],
      maxLength: [20, "Lastname must be at most 20 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 3 characters"],
      select: false,
    },
    image: { type: String },
    role: {
      type: String,
      default: "user",
      enum: ["user", "premium", "admin"],
    },
    status: {
      type: Boolean,
      default: true,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
    github: {
      type: Boolean,
      default: false,
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

const User = models.User || model("User", userSchema);
export default User;
