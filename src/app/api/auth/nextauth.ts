import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github' // Import GithubProvider correctly
// import { GoogleProvider } from 'next-auth/providers/google'; // If you are using GoogleProvider, import it correctly

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
}

export default NextAuth(authOptions)
