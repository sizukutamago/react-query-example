import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// 指定されたリクエストハンドラを持つサービスワーカーを設定する
export const worker = setupServer(...handlers);
