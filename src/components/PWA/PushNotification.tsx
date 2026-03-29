import { usePushNotifications } from "../../hooks/usePushNotifications";

export function PushNotification() {
  const { isSupported, permission, subscription, isLoading, subscribe, unsubscribe } =
    usePushNotifications();

  if (!isSupported) {
    return <p>Push notifications não são suportadas neste navegador.</p>;
  }

  if (permission === 'denied') {
    return (
      <p>
        Notificações bloqueadas. Habilite nas configurações do navegador.
      </p>
    );
  }

  return (
    <div>
      {subscription ? (
        <>
          <p>✅ Notificações push ativadas.</p>
          <button onClick={unsubscribe} disabled={isLoading}>
            {isLoading ? 'Desativando...' : 'Desativar notificações'}
          </button>
        </>
      ) : (
        <>
          <p>🔔 Receba notificações desta aplicação.</p>
          <button onClick={subscribe} disabled={isLoading}>
            {isLoading ? 'Ativando...' : 'Ativar notificações'}
          </button>
        </>
      )}
    </div>
  );
}