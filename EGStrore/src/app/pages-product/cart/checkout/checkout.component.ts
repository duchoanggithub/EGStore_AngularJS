import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { DeliveryService } from '../../../services/delivery.service';
import { OrderProductService } from '../../../services/oderproduct.service';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  delis: any = [];
  cartItems: any[] = [];
  totalPrice: number = 0;
  user: any = {};

  constructor(
    private cartService: CartService,
    private deliSV: DeliveryService,
    private orderSV: OrderService,
    private orderProductSV: OrderProductService,
    private userSV: UserService
  ) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => this.cartItems = items);
    this.cartService.totalPrice$.subscribe(price => this.totalPrice = price);

    //lấy thông tin của tài khoản đang sử dụng đặt hàng
    const userName = localStorage.getItem('userName');
    if (userName) {
      this.userSV.getUserByUserName(userName).subscribe(
        (data: any) => {
          this.user = data;
        },
        (error: any) => {
          console.error('Error fetching user details', error);
        }
      );
    }
    this.getAll();
  }

  getAll() {
    this.deliSV.getListDelivery().subscribe(res => {
      this.delis = res;
    });
  };

  onSubmit(formData: any): void {
    const newOrder = {
      customerName: formData.cusName,
      email: formData.email,
      phoneNumber: formData.cusPhone,
      shippingAddress: formData.address,
      notePay: formData.notePay,
      paymentMethods: formData.paymentMethods,
      deliveryId: formData.deliveryIdz
    };

    // Tạo đơn hàng
    this.orderSV.addOrder(newOrder).subscribe(
      (orderResponse: any) => {
        // Nếu đơn hàng được tạo thành công, thêm các sản phẩm vào đơn hàng
        this.cartItems.forEach(item => {
          const orderProduct = {
            orderId: orderResponse.id,
            prodId: item.productId,
            prodName: item.prodName,
            amount: item.quantity,
            unitPrice: item.price,
            sum: item.quantity * item.price
          };
          // Thêm sản phẩm vào đơn hàng
          this.orderProductSV.addOP(orderProduct).subscribe(
            (productResponse: any) => {
              // Xử lý thành công nếu cần
            },
            (error: any) => {
              console.error('Lỗi thêm sản phẩm vào đơn hàng:', error);
            }
          );
        });
      },
      (error: any) => {
        console.error('Lỗi thêm đơn hàng:', error);
      }
    );
  }
}
