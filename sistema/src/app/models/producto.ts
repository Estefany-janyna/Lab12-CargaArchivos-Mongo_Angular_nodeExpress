export class Producto {

    _id?: string;
    producto: string;
    categoria: string;
    ubicacion: string;
    precio: number;
    imagen: String;

    constructor(producto:string, categoria:string, ubicacion: string, precio: number, imagen:String){
        this.producto = producto;
        this.categoria = categoria;
        this.ubicacion = ubicacion;
        this.precio = precio;
        this.imagen = imagen;
    }

}