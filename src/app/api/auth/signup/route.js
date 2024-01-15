import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request, response) {
  try {
    const data = await request.json();
    const { name, email, password, confirmPassword } = data;

    //check if user exists
    const userFound = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "el email ya se encuentra registrado",
        },
        {
          status: 500,
        }
      );
    }

    //create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    //return new user except password
    delete user.password;
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
