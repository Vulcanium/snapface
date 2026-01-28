import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SERVER_BASE_URL } from '../constants/url.constants';
import { FaceSnap } from '../models/face-snap.model';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  constructor(private http: HttpClient) { }

  faceSnaps: FaceSnap[] = [];

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>(`${SERVER_BASE_URL}/facesnaps`);
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`${SERVER_BASE_URL}/facesnaps/${faceSnapId}`);
  }

  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): void {
    // const faceSnap = this.getFaceSnapById(faceSnapId);
    // snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
  }

  addNewFaceSnap(snapForm: FormGroup): void {
    const id: number = this.faceSnaps[this.faceSnaps.length - 1].id + 1;

    const newFaceSnap: FaceSnap = {
      ...snapForm.value,
      id: id,
      snaps: 0,
      createdDate: new Date()
    }

    this.faceSnaps.push(newFaceSnap);
  }
}
