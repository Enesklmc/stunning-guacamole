import { theme } from 'antd';
import { LoginForm } from './LoginForm';

export const LoginContainer = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        background: colorBgContainer,
        padding: 36,
        borderRadius: borderRadiusLG,
        textAlign: 'left',
      }}
    >
      <LoginForm />
    </div>
  );
};
