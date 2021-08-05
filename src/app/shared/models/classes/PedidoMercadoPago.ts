export class PedidoMercadoPago {
  items: Array<ItemPedido> = [];
  payer: PayerPedido = new PayerPedido();
  back_urls: UrlsPedido = new UrlsPedido();
}

class UrlsPedido {
  success: string = null;
  pending: string = null;
  failure: string = null;
}

class ItemPedido {
  title: string = null;
  unit_price: number = null;
  quantity: number = null;
  description: string = null;
}

class PhonePedido {
  area_code: number = null;
  number: number = null;
}

class AddressPedido {
  zip_code: number = null;
  street_name: string = null;
  street_number: number = null;
}

class IdentificationPedido {
  number: number;
  type: string;
}

class PayerPedido {
  phone: PhonePedido = new PhonePedido();
  address: AddressPedido = new AddressPedido();
  identification: IdentificationPedido = new IdentificationPedido();
  date_created: string = null;
  last_purchase: any = null;
  surname: string = null;
  email: string = null;
  name: string = null;
}
