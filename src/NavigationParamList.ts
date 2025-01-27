export type MainStackParamList = {
  Login: {};
  Register: {};
  Home: {};
  ProductDetails: {
    productId: string;
  };
  Profile: {};
  Settings: {};
  EditProfile: {};
  ChangePassword: {};
  AddProduct: {};
  Chat: {
    userId: string;
  };
  Checkout: {
    productId: string;
    quantity: number;
  };
  OrderConfirmation: {
    orderId: string;
  };
  ManageProducts: {};
  OrderManagement: {};
  Cart: {};
};