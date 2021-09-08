import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  private consultas: AngularFirestoreCollection<any>
  public appointmentId = "";

  constructor(public afs: AngularFirestore) {

    this.consultas = afs.collection<any>('consultas');
  }

  saveInitAppointment(appointmentId, uid, uidDoctor) {
    this.appointmentId = appointmentId.toString();
    return this.afs.collection('consultas').doc(this.appointmentId).set({
      appointmentId: this.appointmentId,
      uid: uid,
      uidDoctor: uidDoctor,
      estado: 'iniciado',
      fechaInit: new Date(),
    }, { merge: true }
    ).catch(err => {
      console.log('error de escritura inicial', err)
    })
  }

  endAppointment() {
    return this.afs.collection('consultas').doc(this.appointmentId).set({
      estado: 'finalizado',
      fechaFinally: new Date()
    }, { merge: true })
      .catch(err => {
        console.log('error al finalizar la consulta', err)
      })
  }

  sendConsulta(newConsulta: any) {
    console.log('en el servicio:', newConsulta);
    return this.afs.collection('consultas').doc(this.appointmentId).set({
      newConsulta
    }, { merge: true })
      .catch(err => {
        console.log('error de escritura en cita', err)
      });
  }

  updateDoctorVisibility(idDoc){
    return this.afs.collection('doctores').doc(idDoc).set({
      data: {
        visible:true
      }
    },{merge: true}
    ).catch(err => {
      console.log('error actualizacion de doctor', err)
    })
  }

  getAllConsultas() {
    return this.afs.collection('doctors').snapshotChanges();
  }

  getDatesPerPatient(idUser) {
    console.log('idUser en servicio:', idUser);
    return this.afs.collection('consultas', ref => ref.where('uid', '==', idUser)).valueChanges();
  }

  getConsultasPerDoctor() {
    const doctorId = localStorage.getItem('dataDoctor');
    let doctor = JSON.parse(doctorId);
    const idDoctor = doctor.professionalId;
    console.log('idUser en servicio:', idDoctor);
    return this.afs.collection('consultas', ref => ref.where('uidDoctor', '==', idDoctor))
      .snapshotChanges();
  }

  getConsultasPerDay() {
    const doctorId = localStorage.getItem('dataDoctor');
    let doctor = JSON.parse(doctorId);
    const idDoctor = doctor.prodessionalId;
    return this.afs.collection('consultas', ref => ref.where('uidDoctor', '==', idDoctor)).snapshotChanges();
  }

  /* getDatesPerPatient(){
    return this.afs.collection('consultas', ref => ref.where('idUsuaio', '==', 2306)).valueChanges();
} */

}