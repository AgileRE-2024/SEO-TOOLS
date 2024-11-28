import { hashPassword } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  let data;
  try {
    // Parsing request body
    data = await request.json();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const { userName, email, password } = data;

  // Validasi: Pastikan semua field diisi
  if (!userName || !email || !password) {
    return NextResponse.json(
      { message: "Name, email, and password are required." },
      { status: 400 }
    );
  }

  // Validasi: Format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Invalid email format." },
      { status: 400 }
    );
  }

  // Validasi: Panjang password
  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters long." },
      { status: 400 }
    );
  }

  // Validasi: Panjang dan format userName
  if (userName.length < 3 || userName.length > 50) {
    return NextResponse.json(
      { message: "Name must be between 3 and 50 characters long." },
      { status: 400 }
    );
  }

  const nameRegex = /^[a-zA-Z0-9\s]+$/;
  if (!nameRegex.test(userName)) {
    return NextResponse.json(
      {
        message: "Name can only contain alphanumeric characters and spaces.",
      },
      { status: 400 }
    );
  }

  let client;
  try {
    // Connect to database
    client = await connectToDB();
    const db = client.db("SEOBoost");
    const usersCollection = db.collection("users");

    // Validasi: Periksa apakah email sudah terdaftar
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email." },
        { status: 409 }
      );
    }

    // Hash password (asynchronous)
    const hashedPassword = await hashPassword(password);

    // Simpan pengguna baru
    const newUser = { userName, email, hashedPassword };
    await usersCollection.insertOne(newUser);

    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 }
    );
  } finally {
    // Tutup koneksi database
    if (client) {
      client.close();
    }
  }
}

export function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export function PUT() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export function DELETE() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
