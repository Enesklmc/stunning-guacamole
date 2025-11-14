import React from 'react';
import { Card, Descriptions, Tag } from 'antd';
import { useParams } from 'react-router';
import { useAppSelector } from '../redux/hooks';
import { selectInvoices } from '../redux/invoices/invoicesSlice';

const InvoiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const invoices = useAppSelector(selectInvoices);
  console.log('asdsad', invoices);

  if (!invoices) return <div>Loading...</div>;

  const invoice = invoices.find((inv: any) => inv.id === id);

  if (!invoice) return <div>Invoice not found</div>;

  const getStatusColor = (status: string) => {
    if (status.includes('SAVED') || status === 'Pending') return 'orange';
    if (status === 'Overdue') return 'red';
    return 'green';
  };

  return (
    <Card
      title={`Invoice: ${invoice.invoiceNumber}`}
      style={{ maxWidth: 600, margin: '20px auto' }}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label='Customer'>
          {invoice.customerName}
        </Descriptions.Item>
        <Descriptions.Item label='Issue Date'>
          {new Date(invoice.issueDate).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label='Payable Amount'>{`${invoice.payAmount.toFixed(
          2
        )} EUR`}</Descriptions.Item>
        <Descriptions.Item label='Status'>
          <Tag color={getStatusColor(invoice.status)}>{invoice.status}</Tag>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default InvoiceDetailPage;
