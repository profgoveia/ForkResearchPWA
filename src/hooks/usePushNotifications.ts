import { useState, useEffect, useCallback } from 'react';
import {
  subscribeToPush,
  unsubscribeFromPush,
  getPermissionState,
} from '../utils/pushNotifications';

interface UsePushNotificationsReturn {
  isSupported: boolean;
  permission: NotificationPermission;
  subscription: PushSubscription | null;
  isLoading: boolean;
  subscribe: () => Promise<PushSubscription | null>;
  unsubscribe: () => Promise<void>;
}

export function usePushNotifications(): UsePushNotificationsReturn {
  const isSupported =
    'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isSupported) return;

    getPermissionState().then(setPermission);

    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager.getSubscription().then(setSubscription);
    });
  }, [isSupported]);

  const subscribe = useCallback(async (): Promise<PushSubscription | null> => {
    setIsLoading(true);
    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);

      if (perm !== 'granted') return null;

      const sub = await subscribeToPush();
      setSubscription(sub);

      if (sub) {
        // Envie `sub.toJSON()` ao seu backend aqui
        console.log('Subscription para enviar ao backend:', JSON.stringify(sub));
        const response = await fetch(
          'https://qxvsmsiuwxofqngbizid.supabase.co/functions/v1/send-notification',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              subscription: sub!.toJSON(),
              title: 'Olá!',
              body: 'Isso é um teste de push notification.',
            }),
          }
        );

        const data = await response.json();
        console.log(data);
      }

      return sub;
    } catch (err) {
      console.error('Erro ao se inscrever:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const unsubscribe = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await unsubscribeFromPush();
      setSubscription(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isSupported, permission, subscription, isLoading, subscribe, unsubscribe };
}