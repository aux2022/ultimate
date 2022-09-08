import { identifierName } from '@angular/compiler'
import { Component, OnInit, TemplateRef } from '@angular/core'
import { Observable } from 'rxjs'
import { Solicitud } from 'src/app/models/solicitud'
import { SolicitudService } from 'src/app/services/solicitud.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { CargarScriptsService } from 'src/app/cargar-scripts.service'
import { AuthService } from 'src/app/services/auth.service'
declare var window: any
import Swal from 'sweetalert2'
@Component({
  selector: 'app-monitoreo-almacen',
  templateUrl: './monitoreo-almacen.component.html',
  styleUrls: ['./monitoreo-almacen.component.css'],
})
export class MonitoreoAlmacenComponent implements OnInit {
  solicitud: Solicitud = new Solicitud()
  datatable: any = []
  datatableterminadas:any=[];
  datatablerechazadas:any=[];
  datatableProceso:any=[];
  title: any = ''
  private fileTmp:any
  formModal: any //1
  public titles = ''
  bsModalRef: BsModalRef = new BsModalRef()
  bsModalRef1: BsModalRef = new BsModalRef()
  constructor(
     private authService: AuthService,
    private solicitudService: SolicitudService,
    private modalService: BsModalService,
    private _CargarScripts: CargarScriptsService,
  ) {
    _CargarScripts.carga(['pruebasS'])
  }

  ngOnInit(): void {

    this.authService.logoutAlma();
    this.reload();
    this.onDataTable();
    this.onDataTableProceso();
    this.onDataTableRechazadas();
    this.onDataTableTerminadas();
  }
  imprimir(){
    console.log()
  }

  getFile($event: any): void {
    //TODO esto captura el archivo!
    const [ file ] = $event.target.files;
    this.fileTmp = {
      fileRaw:file,
      fileName:'http://172.16.10.239:3000/'+''+this.solicitud.id_solicitud+'2'+ file.name
      
    }
  }
onDataTableProceso()
{
this.solicitudService.GetSolicitudAceptInProcess().subscribe(res=>{
  this.datatableProceso=res;
  console.log(res);
});

}
onDataTableTerminadas()
{
this.solicitudService.GetSolicitudTerminadas().subscribe(res=>{
  this.datatableterminadas=res;
  console.log(res);
});

}
onDataTableRechazadas()
{
this.solicitudService.GetSolicitudRechazadas().subscribe(res=>{
  this.datatablerechazadas=res;
  console.log(res);
});

}


 

  onDataTable() {
    this.solicitudService.getSolicitud().subscribe((res) => {
      this.datatable = res
    })
  }
  onUpdateActivoR(solicitud: Solicitud): void {
    console.log("sin nada:",solicitud.nombreImagen2)
    console.log("con algo:",solicitud.nombreImagen2= this.fileTmp.fileName)
    this.solicitudService
      .updateSolicitud(solicitud.id_solicitud, solicitud)
      .subscribe((res) => {
        if (res) {
          // solicitud.nombreImagen2=this.fileTmp.fileName
          
          Swal.fire({
            title: 'Regreso',
            text: "La información ha sido guardada con exito!, Notificando!!.",
            icon: 'success',
            
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
             
                this.onDataTable(),
          this.onDataTableProceso(),
    this.onDataTableRechazadas(),
    this.onDataTableTerminadas()
              
            }

          })
          const body = new FormData();
          body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName);
          body.append('email','test@test.com')
      
      console.log(this.fileTmp.fileName)
          this.solicitudService.sendPost(body)
          .subscribe(res => console.log(res))
          solicitud.nombreImagen=this.fileTmp.fileName
        } else {
          alert('Error! :(')
        }
      })
  }

  onUpdateSalida(solicitud: Solicitud): void {
    if((document.getElementById('txtFecha') as HTMLInputElement).value === ''){
alert('Debes de agregar una fecha')
    }
else{
  this.solicitudService
  .updateSolicitud(solicitud.id_solicitud, solicitud)
  .subscribe((res) => {
    if (res) {

      Swal.fire({
        title: 'Salida',
        text: "La información ha sido guardada con exito!, Esperando salida en vigilancia.",
        icon: 'success',
        
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
         
            this.onDataTable(),
      this.onDataTableProceso(),
this.onDataTableRechazadas(),
this.onDataTableTerminadas()
          
        }
      })


      

      
      
    } else {
      alert('Error! :(')
    }
  })
}



    
  }
  reload(){
    if (window.performance.navigation.type == 1) {
    
        this.authService.logout()
        //location.href ="login";
    
   
   }else{
  }
  }
  onSetData(select: any) {
    this.solicitud.id_solicitud = select.id_solicitud
  this.solicitud.solicitante = select.solicitante
  this.solicitud.correoSolicitante = select.correoSolicitante
  this.solicitud.fechaSolicitud = select.fechaSolicitud
  this.solicitud.tipoTicket = select.tipoTicket
  this.solicitud.provedor = select.provedor
  this.solicitud.motivo = select.motivo
  this.solicitud.area = select.area
  this.solicitud.descripcion = select.descripcion
  this.solicitud.observaciones = select.observaciones
  this.solicitud.regresa = select.regresa
  this.solicitud.autorizador = select.autorizador
  this.solicitud.statusAprobacion = select.statusAprobacion
  this.solicitud.comentariosAutorizador = select.comentariosAutorizador //
  this.solicitud.fechaSalida = select.fechaSalida
  this.solicitud.nombreProvedor = select.nombreProvedor
  this.solicitud.validarSalida = select.validarSalida
  this.solicitud.fechaCompromiso = select.fechaCompromiso
  this.solicitud.comentariosCompras = select.comentariosCompras
  this.solicitud.fechaRegreso = select.fechaRegreso
  this.solicitud.comentariosRegreso = select.comentariosRegreso
  this.solicitud.status2 = 'En reparación con'
  this.solicitud.emailSent = select.emailSent
  this.solicitud.historialCompras = select.historialCompras
  this.solicitud.nombreImagen=select.nombreImagen
this.solicitud.etapa=select.etapa
this.solicitud.nombreImagen2=select.nombreImagen2
  }
  onSetDataRegreso(select: any) {
    this.solicitud.id_solicitud = select.id_solicitud
    this.solicitud.solicitante = select.solicitante
    this.solicitud.correoSolicitante = select.correoSolicitante
    this.solicitud.fechaSolicitud = select.fechaSolicitud
    this.solicitud.tipoTicket = select.tipoTicket
    this.solicitud.provedor = select.provedor
    this.solicitud.motivo = select.motivo
    this.solicitud.area = select.area
    this.solicitud.descripcion = select.descripcion
    this.solicitud.observaciones = select.observaciones
    this.solicitud.regresa = select.regresa
    this.solicitud.autorizador = select.autorizador
    this.solicitud.statusAprobacion = select.statusAprobacion
    this.solicitud.comentariosAutorizador = select.comentariosAutorizador //
    this.solicitud.fechaSalida = select.fechaSalida
    this.solicitud.nombreProvedor = select.nombreProvedor
    this.solicitud.validarSalida = select.validarSalida
    this.solicitud.fechaCompromiso = select.fechaCompromiso
    this.solicitud.comentariosCompras = select.comentariosCompras
    this.solicitud.fechaRegreso = select.fechaRegreso
    this.solicitud.comentariosRegreso = select.comentariosRegreso
    this.solicitud.status2 = 'Recibido en almacén'
    this.solicitud.emailSent = select.emailSent
    this.solicitud.historialCompras = select.historialCompras
    this.solicitud.nombreImagen=select.nombreImagen
    this.solicitud.etapa=select.etapa
    this.solicitud.nombreImagen2=select.nombreImagen2
    
    
    
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template)
  }

  openModal1(template1: TemplateRef<any>) {
    this.bsModalRef1 = this.modalService.show(template1)
  }
  saveSomeThing() {
    // confirm or save something
    this.bsModalRef.hide()
  } //4
  saveSomeThing1() {
    // confirm or save something
    this.bsModalRef1.hide()
  } //4
  
}
