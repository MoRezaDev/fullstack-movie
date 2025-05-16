export class CreateLikeDto {
  user: {
    connect: {
      id: string;
    };
  };

  post: {
    connect: {
      id: string;
    };
  };
}
