import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { Usuario } from 'src/app/models/users';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})

export class EditarProductosComponent implements OnInit {
  productoForm: FormGroup;
  id: string | null; 
  http: any;
  constructor(private fb: FormBuilder,
              private aRouter: ActivatedRoute,
              private router: Router,
              private _productoService: ProductoService){
    this.productoForm = this.fb.group({
        producto: ['', Validators.required],
        categoria: ['', Validators.required],
        ubicacion: ['', Validators.required],
        precio: ['', Validators.required]
    })
    this.id = aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    
    this.validarId()

  }

  validarId(){

    if(this.id !== null){
      this._productoService.viewProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.producto,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        })
      })
    }

  }

  editarProducto(){
    
    const PRODUCTO: Producto = {
      producto: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
      imagen: this.productoForm.get('imagen')?.value,
    }

    Swal.fire({
          title: 'Actualizacion de Producto',
          text: "¿Desea actualizar el producto?",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            if(this.id !== null){
              this._productoService.actualizarProducto(this.id, PRODUCTO).subscribe(data => {
                  console.log(PRODUCTO);
                  this.router.navigate(['/listar-productos']) 
              })
            }
          }
        })
    
           
  }


  productId: string = '';  // Asumiendo que tienes un identificador del producto
  selectedFile: File | null = null;


  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (!this.selectedFile) {
      console.error('Seleccione un archivo antes de cargar.');
      return;
    }

    const formData = new FormData();
    formData.append('imagen', this.selectedFile);

    // Asume que tienes un identificador de producto (this.productId)
    // Puedes ajustar la URL según tu estructura de rutas
    this.http.put(`http://tu-api.com/api/productos/${this.productId}`, formData)
      .subscribe(
        (response: any) => {
          console.log('Imagen cargada exitosamente', response);
          // Puedes realizar alguna acción adicional después de la carga
        },
        (error: any) => {
          console.error('Error al cargar la imagen', error);
        }
      );
  }

}
