import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../core/services/common.service';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  productoForm: FormGroup;
  categories: any[] = [];
  brands: any[] = [];
  isEditMode = false;
  productId :any;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private commonService: CommonService, 
              private productService: ProductService) 
  {
    this.productoForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      active: [true] // Valor predeterminado como activo
    });

    this.getCategories();
    this.getBrands();
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId; // Modo edición si `id` existe

    if (this.isEditMode) {
      this.getProductById(this.productId);
    }
  }

  getProductById(productId: any){
    this.productService.getProductById(productId).subscribe({
      next: (product: any)=>{
        this.productoForm.patchValue({
          name: product.name,
          categoryId: product.categoryId,
          brandId: product.brandId,
          price: product.price,
          stock: product.stock,
          description: product.description,
          active: product.active
        });
      },
      error: ()=>{

      }
    })
  }

  onSubmit() {
    if (this.productoForm.valid) {
      
      if(this.isEditMode){
        this.productService.updateProduct(this.productId,this.productoForm.value).subscribe({
          next: (data) =>{
            Swal.fire({
              title: 'Producto editado.',
              text: `${data.message}`,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          },
          error: ()=>{

          }
        })
      }

      this.productService.addProduct(this.productoForm.value).subscribe({
        next: ()=>{

        },
        error: ()=>{

        }
      });

    } else {
      this.productoForm.markAllAsTouched(); // Marcar todos los campos como "tocados" para mostrar errores
    }
  }

  getCategories() {
    return this.commonService.GetCommon("getCategories").subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: () => {

      }
    })
  }

  getBrands() {
    return this.commonService.GetCommon("getBrands").subscribe({
      next: (data) => {
        this.brands = data;
      },
      error: () => {

      }
    })
  } 
}
