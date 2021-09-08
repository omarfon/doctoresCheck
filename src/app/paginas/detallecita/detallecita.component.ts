import { Component, OnInit, ElementRef, Output, EventEmitter, Input, Optional, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


//Agora
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';
import * as moment from 'moment';
import { DatapacienteService } from 'src/app/services/datapaciente.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { DatepastComponent } from 'src/app/modals/datepast/datepast.component';

import Swal from 'sweetalert2'
import { GetPermissionsService } from 'src/app/services/get-permissions.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { AngularFireStorage } from '@angular/fire/storage';
import { CieService } from 'src/app/services/cie.service';
import { DiagnosticsComponent } from 'src/app/modals/diagnostics/diagnostics.component';
import { FarmacosService } from 'src/app/services/farmacos.service';
import { SendMailService } from 'src/app/services/send-mail.service';
import { ErrorconectionComponent } from 'src/app/modals/errorconection/errorconection.component';







@Component({
  selector: 'app-detallecita',
  templateUrl: './detallecita.component.html',
  styleUrls: ['./detallecita.component.scss']
})
export class DetallecitaComponent implements OnInit {
  public consultaForm: FormGroup;
  public dataPaciente;

  //Agora
  topVideoFrame = 'partner-video';
  userId: string;
  partnerId: string;
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;

  title = 'angular-video';
  localCallId;
  remoteCalls: string[] = [];
  public channel;
  public token;

  private client: AgoraClient;
  private localStream: Stream;
  private uid;

  private dates;
  nombrePaciente;
  apellidoPaciente;
  idPaciente;
  public time;
  public datosPaciente: any;
  public idPatient;
  fechaNac;
  recipepdf: any;
  recipe: any;
  diagnostics: any = "";
  farmacos: any;
  dialogValue: any;
  diagnostico: any = "";
  active: any;
  farmacoSelect: any;
  farmaco: string = "";
  farmacoMarca: string = "";
  farmacoConcentration;
  public medicinas: any = [];
  public duration = "";
  public frecuencia = "";
  public total = "";
  public anotations = "";
  public activeprinciple = "";
  public marc = "";
  public dosis = "";
  visible: boolean = false;
  public dataEnviada: any;
  public error_conexion;

  constructor(public cs: ConsultasService,
    public router: Router,
    public route: ActivatedRoute,
    private elRef: ElementRef,
    private ngxAgoraService: NgxAgoraService,
    private dataPacienteSrv: DatapacienteService,
    private modal: MatDialog,
    private _bottomSheet: MatBottomSheet,
    public permissionSrv: GetPermissionsService,
    public afs: AngularFireStorage,
    public cieSrv: CieService,
    public farmaSrv: FarmacosService,
    public sendMailSrv: SendMailService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('this.data:', this.data);
    this.consultaForm = this.createForm();
  }

  ngOnDestroy() {
    this.closeSession();
    console.log('eliminando página');
  }

  get firstName() { return this.consultaForm.get('firstName'); }
  get lastname() { return this.consultaForm.get('lastname'); }
  get mlastname() { return this.consultaForm.get('mlastname'); }
  get dni() { return this.consultaForm.get('dni'); }
  get birthdate() { return this.consultaForm.get('birthdate'); }
  get sex() { return this.consultaForm.get('sex'); }

  ngOnInit() {
    let datosPaciente = this.route.snapshot.paramMap.get('data');
    this.dataPaciente = JSON.parse(datosPaciente);
    console.log('dataPaciente:', this.dataPaciente);



    if (datosPaciente) {
      this.getDataPaciente();
      this.getPermissionVideo();
      this.saveInitAppointment();
    }
    this.crhono();
  }

  saveInitAppointment() {
    const appointmentId = this.dataPaciente.appointmentId;
    const uid = this.dataPaciente.patientId;
    const uidDoctor = this.dataPaciente.professionalId;

    this.cs.saveInitAppointment(appointmentId, uid, uidDoctor);
  }


  handleSearch(value: string) {
    let codigo = "";
    let nombre = value;
    this.cieSrv.getDatosCie(codigo, nombre).subscribe(data => {
      this.diagnostics = data;
      console.log(this.diagnostics)
    })
  }

  obtenerRecipes(event) {
    console.log('active:', this.active);
    let farmaco = event.target.value
    this.farmaSrv.getFarmaco(farmaco).subscribe(data => {
      this.farmacos = data
      console.log(this.farmacos);
    })
  }

  selectFarmaco(f) {
    console.log('farmaco', f);
    this.farmacoSelect = f;
    this.farmaco = this.farmacoSelect.nombreGenerico;
    this.farmacoMarca = this.farmacoSelect.marcaComercial;
    this.farmacos = undefined;
    this.visible = true;
  }

  initiVideo() {
    this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    this.assignClientHandlers();

    this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
    this.assignLocalStreamHandlers();
    this.initLocalStream(
      () => this.join(uid => this.publish(), error => {
        console.error(error);
        this.error_conexion = error;
        location.reload();
        /* this.errorConection(this.error_conexion); */
      }));
    this.localStream.setVideoProfile('720p_3');
  }

  /* errorConection(err) {
    this.data = err;
    this.modal.open(ErrorconectionComponent, err);

  } */

  createForm() {
    return new FormGroup({
      motive: new FormControl('', [Validators.minLength(5)]),
      exploration: new FormControl('', [Validators.minLength(5)]),
      anamnesis: new FormControl('', [Validators.minLength(5)]),
      pronostico: new FormControl('', [Validators.minLength(5)]),
      diagnostic: new FormControl(this.diagnostico, [Validators.minLength(5)]),
      evolution: new FormControl('', [Validators.minLength(5)]),
      more: new FormControl('', [Validators.minLength(5)]),
      examaux: new FormControl(''),
      proced: new FormControl(''),
      activeprinciple: new FormControl(''),
      marc: new FormControl(''),
      duration: new FormControl(''),
      frecuencia: new FormControl(''),
      dosis: new FormControl(''),
      total: new FormControl(''),
      anotations: new FormControl('')
    })
  }

  getPermissionVideo() {
    let patientId = this.dataPaciente.patientId;
    let appointmentid = this.dataPaciente.appointmentId;
    this.permissionSrv.getPermissionsVideo(patientId, appointmentid).subscribe(data => {
      console.log('data', data);
      this.channel = data.channel;
      this.token = data.token;
      this.localCallId = data.uid.toString();
      this.uid = data.uid;
      this.initiVideo();
    }, err => {
      console.log(err)
    })
  }

  getDataPaciente() {
    this.dataPacienteSrv.getDatesPatient(this.dataPaciente.patientId).subscribe(data => {
      this.datosPaciente = data;
      this.idPatient = data.patientId;
      console.log('this.datosPaciente:', this.datosPaciente);
      this.calculoEdad();
    })
  }

  onReset() {
    this.consultaForm.reset();
  }

  resetReseta() {
    this.consultaForm.value.activeprinciple.reset();
  }

  calculoEdad() {
    const fecha = moment().format('YYYY-MM-DD');
    const fecha_nac = moment(this.datosPaciente.fecha_nac).format('YYYY-MM-DD');
    console.log('las variables', fecha, fecha_nac);
    // recibe fecha actual y fecha de nacimiento

    let a = moment(fecha);
    let b = moment(fecha_nac);

    let years = a.diff(b, 'year');
    b.add(years, 'years');

    let months = a.diff(b, 'months');
    b.add(months, 'months');

    let days = a.diff(b, 'days');

    if (years == 0) {
      if (months <= 1) {
        if (days <= 1) {
          this.fechaNac = months + ' mes ' + days + ' dia';
        } else {
          this.fechaNac = months + ' mes ' + days + ' dia';
        }
      } else {
        if (days <= 1) {
          this.fechaNac = months + ' meses ' + days + ' dia';
        } else {
          this.fechaNac = months + ' meses ' + days + ' dias';
        }
      }

    } else {
      if (years == 1) {
        this.fechaNac = years + ' año';
      } else {
        this.fechaNac = years + ' años';
      }
    }

  }




  onSaveForm(): void {
    const dataDoc = JSON.parse(localStorage.getItem('dataDoctor'))
    console.log('this.consultaForm.value:', this.consultaForm.value);
    console.log(this.dataPaciente);
    let datos = this.consultaForm.value;
    this.dataEnviada = {
      savein: new Date(),
      nombreUsuario: this.dataPaciente.patientName,
      apellidopUsuario: this.dataPaciente.patientLastname,
      apellidomUsuario: this.dataPaciente.patientLastname2,
      idUsuaio: this.dataPaciente.patientId,
      email: this.datosPaciente.email,
      professionalId: this.dataPaciente.professionalId,
      dataDoctor: [
        {
          nombre: dataDoc.displayName,
          name: dataDoc.name,
          surname1: dataDoc.surname1,
          surname2: dataDoc.surname2,
          cmp: dataDoc.codigoColegiado,
          id: dataDoc.professionalId,
        }
      ],
      dataPaciente: this.dataPaciente,
      hourDate: this.dataPaciente.time,
      date: this.dataPaciente.datetime,
      provisionDescription: this.dataPaciente.provisionDescription,
      appointmentId: this.dataPaciente.appointmentId,
      datetime: this.dataPaciente.datetime,
      now: moment().format('YYYY-MM-DD'),
      edad: this.fechaNac,
      datosConsulta: datos,
      prescription: this.medicinas,
      diagnostico: this.diagnostico
    }

    const appointmentId = this.dataPaciente.appoinmentId;
    this.cs.sendConsulta(this.dataEnviada);
    Swal.fire('Data Guardada...', 'Listo... acabas de guardar datos de la consulta!', 'success')
    console.log('data enviada:', this.dataEnviada);

  }

  sendRecipe() {
    const datos = {
      patientId: this.dataPaciente.patientId,
      appointmentId: this.dataPaciente.appointmentId,
      recipe: this.dataEnviada
    }
    this.sendMailSrv.SendRecipe(datos).subscribe(data => {
      console.log('correo enviado: al finalizar la sesión:', data);
    }, err => {
      Swal.fire('Error en escritura...', 'Por algún motivo la data no puede guardarse... utiliza otro sistema para guardar los datos de esta consulta', 'error')
      console.log('data enviada:', this.dataEnviada);
    })
  }


  //Agora
  crhono() {
    setInterval(() => {
      this.updateTime();
    }, 1000)
  }

  updateTime() {
    this.time = moment().format('hh:mm:ss');
  }
  /**
 * Attempts to connect to an online chat room where users can host and receive A/V streams.
 */
  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.client.join(this.token, this.channel, this.uid, onSuccess, onFailure);
  }
  /**
   * Attempts to upload the created local A/V stream to a joined chat room.
   */
  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
    });
  }

  private initLocalStream(onSuccess?: () => any): void {
    this.localStream.init(
      () => {
        // The user has granted access to the camera and mic.
        console.log('this.localCallId', this.localCallId);
        this.localStream.play(this.localCallId);
        if (onSuccess) {
          onSuccess();
        }
      },
      err => console.error('getUserMedia failed', err)
    );
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }


  leave() {
    this.client.leave(() => {
      console.log("Leavel channel successfully");
    }, (err) => {
      console.log("Leave channel failed");
    });
    this.localStream.close();
  }

  closeSession() {
    this.finallyAppointment();
    this.client.leave();
    this.localStream.close();
    this.removeTokens();
    this.sendRecipe();
    this.onReset();
    this.router.navigate(['home']);
  }

  removeTokens() {
    let appointmentId = this.dataPaciente.appointmentId;
    console.log(this.dataPaciente);
    this.permissionSrv.quitPermissions(appointmentId).subscribe(data => {
      console.log('tokens eliminados', data);
    })
  }

  finallyAppointment() {
    this.cs.endAppointment();
  }

  get medicines() {
    return this.consultaForm.get('medicines') as FormArray;
  }

  addNewMedicine() {
    this.medicinas.push(
      {
        principioActivo: this.farmaco,
        productoSugerido: this.farmacoMarca,
        indicacionesTiempo: this.duration,
        frecuencia: this.frecuencia,
        indicacionesDosis: this.dosis,
        cantidad: this.total,
        indicacionesNota: this.anotations,
      }
    );
    this.farmaco = "";
    this.farmacoMarca = "";
    this.farmacoSelect = "";
    this.duration = "";
    this.frecuencia = "";
    this.dosis = "";
    this.total = "";
    this.anotations = "";
    this.visible = false;
    console.log('this.medicinas en el push:', this.medicinas);

  }


  mute() {
    console.log('mute');
  }

  openModalCitas() {
    /* this._bottomSheet.open(DatepastComponent); */
    this.modal.open(DatepastComponent, {
      data: {
        data: this.datosPaciente
      }
    });
  }

  get motive() {
    return this.consultaForm.get('motive');
  }
  get exploration() {
    return this.consultaForm.get('exploration');
  }
  get anamnesis() {
    return this.consultaForm.get('anamnesis');
  }
  get pronostico() {
    return this.consultaForm.get('pronostico');
  }
  get diagnostic() {
    return this.consultaForm.get('diagnostic');
  }
  get evolution() {
    return this.consultaForm.get('evolution');
  }
  get more() {
    return this.consultaForm.get('more');
  }
  get examaux() {
    return this.consultaForm.get('examaux');
  }
  get proced() {
    return this.consultaForm.get('proced');
  }

  // exportAsPDF(recetascroll) {
  //   const data = document.getElementById('recetascroll');
  //   html2canvas(data).then(canvas => {
  //     const contentDataURL = canvas.toDataURL('image/png')
  //     let pdf = new jspdf('l', 'cm', 'a4');
  //     //let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in portrait mode
  //     pdf.addImage(contentDataURL, 'PNG', 1, 1, 29.7, 21.0);
  //     this.recipepdf = pdf;
  //     console.log(this.recipepdf, contentDataURL);
  //     pdf.save('recetafinal');
  //   });
  // }

  /*   subirReceta() {
      const nameUp = this.dataPaciente.appointmentId.toString();
      const archivo = this.recipepdf;
      const ruta = `recipes/${nameUp}`;
      console.log('ruta:', ruta);
      const referencia = this.afs.ref(ruta);
      const tarea = referencia.put(archivo)
      tarea.then((imagen) => {
        console.log('imagen', imagen);
      })
    } */

  getDiagnostic(diagnos) {
    console.log('diagnos', diagnos);
  }

  openModalDiagnostic() {
    const dialogRef = this.modal.open(DiagnosticsComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.dialogValue = result.data;
      this.diagnostico = this.dialogValue.data.codigo + " " + '-' + " " + this.dialogValue.data.nombre;
    });
  }

  cancelar() {
    this.diagnostico = undefined;
  }



}
