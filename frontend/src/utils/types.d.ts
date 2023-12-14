export type dataContextType = {
  payments: paymentType[];
  invoices: invoiceType[];
  clients: clientsType[];
  businessStaffs: businessStaffType[];
  isLoadingPayments: boolean;
  isLoadingInvoices: boolean;
  isLoadingClients: boolean;
  isLoadingBusinessStaffs: boolean;
  paymentsErrMsg: string;
  invoicesErrMsg: string;
  clientsErrMsg: string;
  businessStaffsErrMsg: string;
  fetchPayments: () => void;
  fetchInvoices: () => void;
  fetchClients: () => void;
  fetchStaffs: () => void;
};

export type clientsType = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export type paymentType = {
  _id: string;
  name: string;
  notes: string;
  amount: number;
  __v: number;
};

export type invoiceType = {
  amount: number;
  business: string;
  client: string;
  clientEmail: string;
  createdAt: string;
  installmentAmount: number;
  nextPayment: string;
  paymentInterval: number;
  paymentStatus: boolean;
  paymentType: number;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type businessStaffType = {
  business: string;
  department: string;
  email: string;
  isBusiness: boolean;
  isVerified: boolean;
  managerName: string;
  name: string;
  staffId: string;
  userName: string;
  _id: string;
};
