import { Component } from '@angular/core';
import { ProcuctService } from './procuct.service';
import { Product } from './product';
import { ConfirmationService } from 'primeng/api';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);





@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {


  products: Product[] = [];
  displayAddEditModal = false;
  selectedProduct: any = null;
  tableCategory: any[] = [];
  data: any = [];
  labels: unknown[] | undefined;
  tableLable: any;
  tableData: any;



  constructor(private productService: ProcuctService, private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this.getProductList();


    this.productService.getChartData().subscribe(
      response => {
        this.data = response;
        this.tableCategory = this.data.map((it: { category: string; }) => it.category)
          .reduce((acc: Record<string, number>, curr: string) => {
            acc[curr] ? acc[curr]++ : acc[curr] = 1
            return acc;
          }, {} as Record<string, number>)
        this.RenderCharts();
        window.localStorage.setItem("test", JSON.stringify(this.tableCategory));

      })


  }


  getProductList() {
    this.productService.getProducts().subscribe(
      response => {
        this.products = response;
        console.log(response);
      }
    )
  }
  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }
  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }
  saveOrUpdateProductList(newData: any) {
    if (this.selectedProduct && newData.id === this.selectedProduct.id) {
      const productIndex = this.products.findIndex(data => data.id === newData.id);
      this.products[productIndex] = newData;
    } else {
      this.products.unshift(newData);
    }

  }
  showEditmodal(product: Product) {
    this.displayAddEditModal = true;
    this.selectedProduct = product;

  }
  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are You Sure Want To PerofmAction',
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe(
          response => {
            //this.getProductList();
            this.products = this.products.filter(data => data.id !== product.id);

          },
        )
      }

    });
  }
  // getChartData(procuct: Product) {

  // }

  RenderCharts() {
    const tableLable = Object.keys(this.tableCategory);
    const tableData = Object.values(this.tableCategory);
    const myCharts = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: tableLable,
        datasets: [{
          label: 'stock Information',
          data: tableData,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  objectData(objectData: any) {
    throw new Error('Method not implemented.');
  }


}


