import { Component, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { BlogService } from '../services/blog.service';
import { OrderService } from '../services/order.service';
import { OrderProductService } from '../services/oderproduct.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {
  totalProducts: number = 0;
  totalUsers: number = 0;
  totalBlogs: number = 0;
  totalOrders: number = 0;
  totalSums: number = 0;
  @ViewChild('canvas') canvas: any;
  chart: any;

  constructor(
    private userSV: UserService,
    private prodSV: ProductService,
    private blogSV: BlogService,
    private orderSV: OrderService,
    private orderproductSV: OrderProductService,
  ) { }

  ngOnInit(): void {
    this.loadTotalUsers();
    this.loadTotalProducts();
    this.loadTotalBlogs();
    this.loadTotalOrders();
    this.loadTotalSums();
    //this.loadOrderRevenueData();
  }

  // ngAfterViewInit(): void {
  //   this.loadOrderRevenueData();
  // }

  // loadOrderRevenueData(): void {
  //   this.orderSV.getListOrder().subscribe((orders: any[]) => {
  //     const revenueMap = new Map<string, number>();
  
  //     orders.forEach(order => {
  //       const orderDate = new Date(order.orderDate);
  //       const key = `${orderDate.getFullYear()}-${orderDate.getMonth() + 1}-${orderDate.getDate()}`;
  //       if (revenueMap.has(key)) {
  //         revenueMap.set(key, revenueMap.get(key) + order.totalAmount);
  //       } else {
  //         revenueMap.set(key, order.totalAmount);
  //       }
  //     });
  
  //     const labels = Array.from(revenueMap.keys());
  //     const data = Array.from(revenueMap.values());
  
  //     this.chart = new Chart(this.canvas.nativeElement, {
  //       type: 'bar',
  //       data: {
  //         labels: labels,
  //         datasets: [{
  //           label: 'Doanh thu theo ngày',
  //           data: data,
  //           backgroundColor: 'rgba(54, 162, 235, 0.6)',
  //           borderColor: 'rgba(54, 162, 235, 1)',
  //           borderWidth: 1
  //         }]
  //       },
  //       options: {
  //         scales: {
  //           y: { // Update this line
  //             ticks: {
  //               beginAtZero: true // Update this line
  //             }
  //           }
  //         }
  //       }
  //     });
  //   });
  // }

  loadTotalUsers(): void {
    this.userSV.getListUser().subscribe(response => {
      this.totalUsers = response.length;
    });
  }

  loadTotalProducts(): void {
    this.prodSV.getListProduct().subscribe(response => {
      this.totalProducts = response.length;
    });
  }

  loadTotalBlogs(): void {
    this.blogSV.getListBlog().subscribe(response => {
      this.totalBlogs = response.length;
    });
  }

  loadTotalOrders(): void {
    this.orderSV.getListOrder().subscribe(response => {
      this.totalOrders = response.length;
    });
  }

  loadTotalSums(): void {
    this.orderproductSV.getTotalSum().subscribe(totalSum  => {
      this.totalSums = totalSum;
    });
  }
}
