import {Alert, Button} from 'antd'

function Offline() {

  return (
    <Alert 
          title="Você está Offline! Algumas ações podem não funcionar!" 
          type="error" 
          action={<Button size="small" type="dashed" onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>}
          showIcon 
          />
  );
}

export default Offline;