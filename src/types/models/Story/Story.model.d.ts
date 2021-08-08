export interface StoryPostI {
  title: string;
  tags?: Array<string>;
  content: string;
  desc: string;
  author: string;
  publishDate: string;
  lastEdit: string;
  thumbnail:
    | {
        src: string;
        alt: string;
        option: "local";
      }
    | {
        src: string;
        alt: string;
        option: "unsplash";
        unsplash: {
          author: string;
          src: string;
        };
      };

  published: boolean;
  category: string;

  views: number;
  likes: Array<string>;

  visibility: "public" | "private" | "unlist";
}
