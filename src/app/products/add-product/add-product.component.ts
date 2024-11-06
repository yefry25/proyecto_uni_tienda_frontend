import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../core/services/common.service';

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

  constructor(private fb: FormBuilder, private commonService: CommonService) {
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

  ngOnInit(): void { }

  onSubmit() {
    if (this.productoForm.valid) {
      console.log(this.productoForm.value);
      // Aquí envías los datos al backend o realizas cualquier acción adicional
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
