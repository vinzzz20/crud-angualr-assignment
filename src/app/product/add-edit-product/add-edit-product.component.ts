import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProcuctService } from '../procuct.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit, OnChanges {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedProduct: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Add";
  productForm = this.fb.group({
    // id: ["", Validators.required],
    title: ["", Validators.required],
    price: ["", Validators.required],
    category: ["", Validators.required]

  })
  constructor(private fb: FormBuilder, private productService: ProcuctService) { }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    if (this.selectedProduct) {
      this.modalType = 'Edit';
      this.productForm.patchValue(this.selectedProduct);
    } else {
      this.productForm.reset();
      this.modalType = 'Add';

    }

  }

  closeModal() {
    this.productForm.reset();
    this.clickClose.emit(true);
  }
  addEditProduct() {
    this.productService.addEditProduct(this.productForm.value, this.selectedProduct).subscribe
      (response => {
        this.clickAdd.emit(response);
        this.closeModal();


      })


  }

}
