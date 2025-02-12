import { model, Schema } from "mongoose";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
    methods: {
      verifyPassword: async function (password: string) {
        return await bcrypt.compare(password, this.password!);
      },
      generateToken: function () {
        const payload: Object = { _id: this._id, username: this.username };
        const secretOrPrivateKey: string = process.env.JWT_SECRET!;
        const options: SignOptions = { expiresIn: "30m" };
        return jwt.sign(payload, secretOrPrivateKey, options);
      },
    },
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password!, 12);
  next();
});

const User = model("User", userSchema);

export default User;
