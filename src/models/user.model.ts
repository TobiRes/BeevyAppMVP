export interface User {
  name: string;
  userID: string;
  userProfile: Profile;
}

export interface Profile {
  joinedEvents?: Event[];
  createdEvents?: Event[];
  mail: string;
  token: string;
}

