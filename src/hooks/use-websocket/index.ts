import { useWebSocket } from 'ahooks';
import type { Options, Result } from 'ahooks/lib/useWebSocket';
import { useCallback, useRef } from 'react';

export function useWebSocketMessage(
  socketUrl: string,
  options?: Options
): Result {
  const timerRef = useRef<number>();

  const {
    latestMessage,
    sendMessage,
    connect,
    disconnect,
    readyState,
    webSocketIns,
  } = useWebSocket(socketUrl, {
    ...options,
    reconnectLimit: 30,
    reconnectInterval: 6000,
    onOpen: (event: Event, instance: WebSocket) => {
      sendHeartbeat();

      options?.onOpen && options.onOpen(event, instance);
    },
    onMessage: (message: MessageEvent<any>, instance: WebSocket) => {
      // 再次发送心跳消息
      sendHeartbeat();

      options?.onMessage && options.onMessage(message, instance);
    },
    onClose(event, instance) {
      resetHeartbeat();

      options?.onClose && options.onClose(event, instance);
    },
    onError(event, instance) {
      resetHeartbeat();

      options?.onError && options.onError(event, instance);
    },
  });

  // 清除重连的定时器
  function resetHeartbeat() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
  }

  // 发送心跳消息
  function sendHeartbeat() {
    if (webSocketIns?.CLOSED) {
      return;
    }
    resetHeartbeat();

    // 三秒之后发送一次心跳消息
    setTimeout(() => {
      sendMessage && sendMessage(JSON.stringify({ type: 'Ping' }));
      // 心跳消息发送3s后，还没得到服务器响应，说明服务器可能挂了，需要自动重连。
      timerRef.current = window.setTimeout(() => {
        disconnect && disconnect();
        connect && connect();
      }, 3000);
    }, 3000);
  }

  const disconnectWS = useCallback(() => {
    disconnect && disconnect();
    resetHeartbeat();
  }, [])

  return {
    latestMessage,
    connect,
    sendMessage,
    disconnect: disconnectWS,
    readyState,
    webSocketIns,
  };
}
