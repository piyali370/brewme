// import NextAuth from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google';
// import GitHubProvider from "next-auth/providers/github";
// import mongoose from "mongoose";
// import connectDb from '@/db/connectDb';
// import User from '@/models/User';
// import Payment from '@/models/Payment';
 

// export const authoptions =  NextAuth({
//     providers: [
//       GitHubProvider({
//         clientId: process.env.GITHUB_ID,
//         clientSecret: process.env.GITHUB_SECRET
//       }),
//       GoogleProvider({
//         clientId: process.env.GOOGLE_ID,
//         clientSecret: process.env.GOOGLE_SECRET
//       }),
//     ],
//     callbacks: {
//       async signIn({ user, account, profile, email, credentials }) {
//          if(account.provider == "github" || account.provider == "google") { 
//           await connectDb()
//           // Check if the user already exists in the database
//           const currentUser =  await User.findOne({email: email}) 
//           if(!currentUser){
//             // Create a new user
//              const newUser = await User.create({
//               email: user.email, 
//               username: user.email.split("@")[0], 
//             })   
//           } 
//           return true
//          }
//       },
      
//       async session({ session, user, token }) {
//         const dbUser = await User.findOne({email: session.user.email})
//         session.user.name = dbUser.username
//         return session
//       },
//     } 
//   })

//   export { authoptions as GET, authoptions as POST}



// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import connectDb from "@/db/connectDb";
// import User from "@/models/User";

// const handler = NextAuth({
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],

//   callbacks: {
//     async signIn({ user, account }) {
//       if (!user?.email) return false;

//       if (account.provider === "github" || account.provider === "google") {
//         await connectDb();

//         const currentUser = await User.findOne({ email: user.email });

//         if (!currentUser) {
//           await User.create({
//             email: user.email,
//             username: user.email.split("@")[0],
//           });
//         }

//         return true;
//       }

//       return true;
//     },

//     async session({ session }) {
//       if (!session?.user?.email) return session;

//       await connectDb();
//       const dbUser = await User.findOne({ email: session.user.email });

//       if (dbUser) {
//         session.user.name = dbUser.username;
//       }

//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };




import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email) return false;

      await connectDb();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          email: user.email,
          username: user.email.split("@")[0],
        });
      }

      return true;
    },

    async session({ session }) {
      if (!session?.user?.email) return session;

      await connectDb();
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.name = dbUser.username;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };



// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


