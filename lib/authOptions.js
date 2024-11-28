import Credentials from "next-auth/providers/credentials";
import { connectToDB } from "./db";
import { verifyPassword } from "./auth";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        let client;

        try {
          client = await connectToDB();
          const db = client.db("SEOBoost");
          const usersCollection = db.collection("users");

          // Cari user berdasarkan email
          const user = await usersCollection.findOne({
            email: credentials.email,
          });
          if (!user) {
            throw new Error("User with this email does not exist.");
          }

          // Validasi password
          const isValidPassword = await verifyPassword(
            credentials.password,
            user.hashedPassword
          );

          if (!isValidPassword) {
            throw new Error("Invalid password.");
          }
          console.log(user);
          // Jika valid, kembalikan data user
          return {
            id: user._id,
            name: user.userName,
            email: user.email,
          };
        } catch (error) {
          throw new Error(error.message);
        } finally {
          if (client) {
            await client.close();
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Jika user login berhasil, tambahkan data ke token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Tambahkan data dari token ke sesi
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
};
