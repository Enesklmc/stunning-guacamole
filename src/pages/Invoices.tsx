import React, { useEffect, useState } from 'react';
import { Table, Tag, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectToken } from '../redux/auth/authSlice';
import axios from 'axios';
import { NavLink } from 'react-router';
import { setInvoices } from '../redux/invoices/invoicesSlice';

const body = {
  companyId: '01c880ca-46b5-4699-a477-616b84770071',
  documentType: 'OUTGOING',
  startDate: '2025-06-27T00:00:00.000Z',
  endDate: '2025-07-04T08:31:10.422Z',
  page: 0,
  size: 20,
  referenceDocument: '',
  type: null,
  status: null,
  paymentStatus: null,
  isDeleted: false,
};

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  payAmount: number;
  status: string;
  issueDate: string;
}

const Invoices: React.FC = () => {
  const [invoices, setInvoicesInline] = useState<Invoice[]>([]);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.post(
          'https://api-dev.docnova.ai/invoice/search',
          body,
          {
            headers: {
              'R-Auth': token,
              'Content-Type': 'application/json',
            },
          }
        );

        const content = response.data.invoices.content;
        const mapped = content.map((inv: any) => ({
          id: inv.id,
          invoiceNumber: inv.invoiceNumber,
          customerName: inv.customerName,
          payAmount: inv.payableAmount,
          status: inv.status,
          issueDate: inv.issueDate,
        }));
        setInvoicesInline(mapped);
        dispatch(setInvoices(mapped));
      } catch (err: any) {
        console.log('error', err);
      }
    };

    if (token) fetchInvoices();
  }, [token]);

  const columns = [
    {
      title: 'Invoice Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Amount',
      dataIndex: 'payAmount',
      key: 'payAmount',
      render: (amount: number) => `${amount.toFixed(2)} EUR`,
    },
    {
      title: 'Issue Date',
      dataIndex: 'issueDate',
      key: 'issueDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        if (status.includes('SAVED') || status === 'Pending') color = 'orange';
        if (status === 'Overdue') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Invoice) => (
        <NavLink to={`/invoice/${record.id}`}>
          <Button type='link'>View</Button>
        </NavLink>
      ),
    },
  ];

  return <Table dataSource={invoices} columns={columns} rowKey='id' />;
};

export default Invoices;
