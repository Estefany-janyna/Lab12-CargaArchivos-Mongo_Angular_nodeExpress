import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent {

  productoForm: FormGroup;
  http: any;
  

  constructor(private fb: FormBuilder,
              private router: Router,
              private _productoService: ProductoService){
    this.productoForm = this.fb.group({
        producto:  ['', Validators.required],
        categoria: ['', Validators.required],
        ubicacion: ['', Validators.required],
        precio:    ['', Validators.required],
    })
  }

  agregarProducto(){

    const PRODUCTO: Producto = {
      producto: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
      imagen: '',
    }

    console.log(PRODUCTO)

    Swal.fire({
      title: 'Creacion de Producto',
      text: "¿Desea crear el producto?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._productoService.guardarProducto(PRODUCTO).subscribe(data =>{
          console.log(data);  
          this.router.navigate(['/listar-productos'])
        }) 
      }
    })

    
  }
  

  // onUpload(){
  //   //console.log('Upload');
  //   let formData = new FormData();
  //   for(let i = 0; i < this.uploadFiles.length; i++){
  //     formData.append("uploads[]", this.uploadFiles[i], this.uploadFiles[i].name)
  //   }
  //   // Call Service Upload
  //   this.ProductoService.uploadFile(formData).subscribe((res) => {
  //     console.log('Response:', res);
  //   });
  // }


  // uploadFiles: Array<File> = [];
  // onFileChange(e: any){
  //   //console.log(e);
  //   this.uploadFiles = e.target.files;
  // }


 

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (!this.selectedFile) {
      console.error('Seleccione un archivo antes de cargar.');
      return;
    }

    //console.log(this.productoForm)
  }
  selectedFile: File | null = null;

  subirImagen(productoId: string) {
    const formData = new FormData();
    formData.append('imagen',this.productoForm.get('precio')?.value,);

    this.http.post(`http://localhost:4000/api/productos/${productoId}/imagen`, formData)
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
