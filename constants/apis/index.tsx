const apis = {
  createJsonToken: "/db",
  editJsonDB: "/db",
  getJsonDB: "/db",
  userRequest: "/db",
  jsonDBBackups: "/backup",
  jsonDBBackup: "/backup",
  revokeToken: "/db/revoke-token",
  generateFakeData: "/faker",
  userInfo: "/user",
  signup: "/user/signup",
  signin: "/user/signin",
  forgotPassword: "/user/forgot-pass",
  forgotPasswordConfirmation: "/user/forgot-pass/confirmation",
  contatcUs: "/contact-me",
  likesCount: "/about-me/likes",
  insertLike: "/about-me/like",
  socialAuthConfirmation: "/user/social-auth/confirmation",
};
export default apis;
