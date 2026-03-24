import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

declare const self: any;

clientsClaim();
self.__WB_MANIFEST; // necessário para o injectManifest

precacheAndRoute(self.__WB_MANIFEST);

// ─── Push handler ───────────────────────────────────────────
self.addEventListener('push', (event: any) => {
  const data = event.data?.json() ?? {
    title: 'Nova notificação',
    body: 'Você tem uma nova mensagem.',
    icon: '/icons/icon-192x192.png',
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon ?? '/icons/icon-192x192.png',
      badge: data.badge ?? '/icons/badge-72x72.png',
      data: data.url ? { url: data.url } : undefined,
    })
  );
});

// ─── Clique na notificação ──────────────────────────────────
self.addEventListener('notificationclick', (event:any ) => {
  event.notification.close();

  const url = event.notification.data?.url ?? '/';

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clients: any) => {
        const existing = clients.find((c: any) => c.url === url && 'focus' in c);
        if (existing) return existing.focus();
        return self.clients.openWindow(url);
      })
  );
});