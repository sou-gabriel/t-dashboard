import {
  Button, Form, Input, Select,
} from 'antd';
import { useEffect, useState } from 'react';

import Asset from '../../types/asset';

type Props = {
  initialValues: {
    name: string
    sensors: string[]
    model: string
    image: string
  }
  onSubmit: (data: Asset) => Promise<void>
};

export default function AssetForm({ initialValues, onSubmit }: Props) {
  const [form] = Form.useForm();
  const [isSaving, setIsSaving] = useState(false);

  function handleSave(data: Asset) {
    setIsSaving(true);
    onSubmit(data).finally(() => setIsSaving(false));
  }

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Form
      form={form}
      labelAlign="left"
      labelCol={{ flex: '100px' }}
      className="w-full max-w-[384px]"
      onFinish={handleSave}
    >
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: 'Campo obrigatório.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Sensores"
        name="sensors"
        rules={[{ required: true, message: 'Campo obrigatório.' }]}
      >
        <Select
          mode="multiple"
          options={[{ label: 'GSJ15104', value: '123' }]}
        />
      </Form.Item>

      <Form.Item
        label="Modelo"
        name="model"
        rules={[{ required: true, message: 'Campo obrigatório.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Imagem"
        name="image"
        rules={[{ required: true, message: 'Campo obrigatório.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button loading={isSaving} htmlType="submit">
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </Form.Item>
    </Form>
  );
}
