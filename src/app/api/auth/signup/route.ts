import { NextResponse } from "next/server";
import User from "../../../../models/user.model";
import bcrypt from "bcryptjs";
import { dbConnect } from "../../../../lib/dbConnect";

export async function POST(req: Request) {
  const { firstName, lastName, email, password, image } = await req.json();

  if (!password || password.length < 8)
    return NextResponse.json(
      {
        msg: "Password must be at least 8 characters",
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
    console.log(savedUser);

    return NextResponse.json({
      _id: savedUser._id,
      email: savedUser.email,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      role: savedUser.role,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ msg: error.message }, { status: 400 });
    }
  }
}
