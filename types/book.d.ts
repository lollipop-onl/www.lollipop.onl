/** 書籍情報 */
export interface IBook {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  published: string;
  cover: string;
  price: string;
  dlcUrl: string;
  boothBookUrl: string;
  boothDownloadUrl: string;
  lead: string;
}
