import { Alert, Button } from "antd";
import { usePushNotifications } from "../../hooks/usePushNotifications";

export function PushNotification() {
  const { isSupported, permission, subscription, isLoading, subscribe, unsubscribe } =
    usePushNotifications();

  if (!isSupported) {
    return <Alert title="Push notifications não são suportadas neste navegador." type="warning" showIcon />;
  }

  if (permission === 'denied') {
    return (
      <Alert title="Notificações bloqueadas. Habilite nas configurações do navegador." type="warning" showIcon />
    );
  }

  return (
    <div>
      {subscription ? (
        <Alert 
          title="Notificações push ativadas!" 
          type="success" 
          action={<Button size="small" type="primary" ghost onClick={unsubscribe} disabled={isLoading}>
            {isLoading ? 'Desativando...' : 'Desativar notificações'}
          </Button>}
          showIcon 
          />
      ) : (<Alert 
          title="Receba notificações desta aplicação." 
          type="success" 
          action={<Button size="small" type="dashed" onClick={subscribe} disabled={isLoading}>
            {isLoading ? 'Ativando...' : 'Ativar notificações'}
          </Button>}
          showIcon 
          />
      )}
    </div>
  );
}