import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service'

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo: String = "Detalle del cliente";
  private fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private clienteService: ClienteService,
   private modalService: ModalService) { }

  ngOnInit() {
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    this.progreso = 0;
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;

    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal('Error Upload: ', 'Debe seleccionar una foto', 'error')
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(cliente => {
        if (cliente.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round(100 * (cliente.loaded) / cliente.total);
        } else if (cliente.type === HttpEventType.Response) {
          let response = cliente.body;
          this.cliente = response.cliente as Cliente;
          this.modalService.notificarUpload.emit(this.cliente);
          swal('la foto se  ha subidocompletamente!', response.mensaje, 'success');
        }
        //this.cliente = cliente;

      })
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
