declare namespace NotesServer {
  interface User {
    id: string;
    email: string;
    name: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
  }
}
