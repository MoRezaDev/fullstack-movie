export type decodedUser = {
  userId: string;
};

export type RequestWithUser = Request & {
  user: {
    userId: string;
  };
};
