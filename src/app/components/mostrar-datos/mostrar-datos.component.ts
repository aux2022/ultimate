import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-mostrar-datos',
  templateUrl: './mostrar-datos.component.html',
  styleUrls: ['./mostrar-datos.component.css']
})
export class MostrarDatosComponent implements OnInit {
  solicitud:Solicitud = new Solicitud();
  //public editForm: FormGroup;
  postRef:any;
  datatable:any=[];
  //arreglo
  bsModalRef: BsModalRef = new BsModalRef()
 Serv:Solicitud={
   id_solicitud: 0,
   solicitante: '',
   fechaSolicitud: '',
   provedor:"",

   motivo: '',
   tipoTicket: '',
   area: '',
   descripcion: '',
   observaciones: '',
   autorizador: '',
   comentariosAutorizador: '',
   fechaSalida: '',
   nombreProvedor: '',
   comentariosCompras: '',
   historialCompras:"",
   fechaRegreso: '',
   status2: '',
   regresa: '',
   validarSalida: '',
   fechaCompromiso: '',
   comentariosRegreso: '',
   correoSolicitante: '',
   emailSent: '',
   statusAprobacion: '',
   nombreImagen:'',
   etapa:0,
   nombreImagen2:''
 };
  constructor( 
    private modalService: BsModalService,
    public solicitudService:SolicitudService,
    //public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    //private router: Router,
    
    
    private _CargarScripts:CargarScriptsService) {_CargarScripts.carga(["imagenes"]) 
    // this.editForm = this.formBuilder.group({
    //   id_solicitud: [''],
    //   fechaSolicitud: [''],
    //   para: [''],
    //   motivo: [''],
    //   cantidad: [''],
    //   unidadMedida: [''],
    //   area: [''],
    //   observaciones: [''],
    // })
  }

  ngOnInit(): void {
    
this.activeRoute.paramMap.subscribe({
  next:(params)=>{
    const id = params.get('id')

    if(id){
      this.solicitudService.getByIdSolicitud(id)
      .subscribe({
next:response => {
this.datatable=response;
console.log("b",this.datatable)

}
      });
    }
  }
  
})

   }
   rechaza(){

   }
   acepta(){

   }
  
onUpdateSalida(solicitud:Solicitud):void{
  
  this.solicitudService.updateSolicitud(solicitud.id_solicitud, solicitud).subscribe(res => {
  
    if(res){
      alert('Datos guardados!, los datos han sido guardados con exito.')
  
      this.clear();
      this.onDataTable();
    } else {
      alert('Error! :(')
    }
  });
}
clear(){
  this.solicitud.id_solicitud=0;
  this.solicitud.fechaRegreso = "";
}
//cvcxzv
onDataTable()
{
this.solicitudService.getSolicitud().subscribe(res=>{
  
  this.datatable=res;
  console.log("a",res, this.solicitud.status2);
});

}

openModal(template: TemplateRef<any>) {
  this.bsModalRef = this.modalService.show(template)
}
saveSomeThing() {
  // confirm or save something
  this.bsModalRef.hide()
} //4
onSetData(solicitud:Solicitud):void{
  this.solicitudService.updateSolicitud(solicitud.id_solicitud, solicitud).subscribe(res => {

    if(res){

  if((document.getElementById("aprobado") as HTMLInputElement).click){

    solicitud.statusAprobacion=(document.getElementById("aprobado") as HTMLInputElement).value
    this.onDataTable();
  }}
});

}

}
