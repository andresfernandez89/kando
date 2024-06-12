import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { firstName, lastName, email, password, rePassword, image } =
    await req.json();

  if (!password || password.length < 8)
    return NextResponse.json(
      {
        msg: "Password must be at least 8 characters",
      },
      { status: 400 },
    );

  if (password !== rePassword)
    return NextResponse.json(
      {
        msg: "Passwords are not same",
      },
      { status: 400 },
    );

  try {
    await dbConnect();
    const userFound = await User.findOne({ email });

    if (userFound)
      return NextResponse.json(
        {
          msg: "Email already exists",
        },
        { status: 409 },
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      image,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      _id: savedUser._id,
      email: savedUser.email,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      role: savedUser.role,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ msg: error.message }, { status: 400 });
    }
  }
}
