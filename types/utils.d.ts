/**
 * @file 型ユーティリティ
 */

/** クラスメンバーのみを抽出する型ユーティリティ */
export type ClassMembers<C extends object> = {
  [K in keyof C]: C extends Function ? never : C[K];
};
