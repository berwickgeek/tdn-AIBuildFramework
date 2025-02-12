import KeycloakProvider from "next-auth/providers/keycloak";

const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email,
          image: `https://faces-img.xcdn.link/thumb-lorem-face-6312_thumb.jpg`,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
