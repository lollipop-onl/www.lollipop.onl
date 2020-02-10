/** 書籍情報 */
export interface IBook {
  id: string;
  title: string;
  author: string;
  published: string;
  cover: string;
  price: string;
  flags: {
    dlc: boolean;
    ebook: boolean;
    book: boolean;
  },
  ebookUrl: string;
  body: string;
}
