import { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import type { FormProps } from 'antd';
import { useAppDispatch } from '../../redux/hooks';
import axios from 'axios';
import { setToken } from '../../redux/auth/authSlice';
import { useTranslation } from '../../hooks/useTranslation';

const { Text } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [isError, setError] = useState(false);
  const { t } = useTranslation();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const { username, password } = values;
      const response = await axios.post(
        'https://api-dev.docnova.ai/auth/login/dev',
        { email: username, password }
      );
      dispatch(setToken(response.data.jwt));
      console.log('user', response.data);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='login'
      style={{ maxWidth: 600, minWidth: 360 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      layout='vertical'
    >
      <Form.Item<FieldType>
        label={t('username')}
        name='username'
        initialValue={'devmelauser@yopmail.com'}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label={t('password')}
        name='password'
        initialValue={'Work123???'}
        rules={[{ required: true, message: 'Please input your password!' }]}
        style={{ flexDirection: 'column' }}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type='primary' htmlType='submit'>
          {t('login')}
        </Button>
      </Form.Item>

      {isError && <Text type='danger'>Failed</Text>}
    </Form>
  );
};
