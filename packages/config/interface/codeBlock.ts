import type { Message } from "@teek/components/common/Message/src/message";

export interface CodeBlock {
  /**
   * 是否禁用新版代码块
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * 超出高度后自动折叠，设置 true 则默认折叠，false 则默认不折叠
   *
   * @default 700
   */
  collapseHeight?: number | boolean;
  /**
   * 复制代码完成后的回调
   */
  copiedDone?: (TkMessage: Message) => void;
  /**
   * 代码块底部是否显示展开/折叠遮罩层
   *
   * @default false
   * @version 1.4.0
   */
  overlay?: boolean;
  /**
   * 当出现遮罩层时，指定代码块显示高度，当 overlay 为 true 时生效
   *
   * @default 400
   * @version 1.4.0
   */
  overlayHeight?: number;
}
