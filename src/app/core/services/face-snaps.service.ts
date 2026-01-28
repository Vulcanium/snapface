import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SERVER_BASE_URL } from '../constants/url.constants';
import { FaceSnap } from '../models/face-snap.model';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  constructor(private http: HttpClient) { }

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>(`${SERVER_BASE_URL}/facesnaps`);
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`${SERVER_BASE_URL}/facesnaps/${faceSnapId}`);
  }

  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    return this.getFaceSnapById(faceSnapId).pipe(
      map(faceSnap => ({ ...faceSnap, snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1) })),
      switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`${SERVER_BASE_URL}/facesnaps/${faceSnapId}`, updatedFaceSnap))
    );
  }

  addNewFaceSnap(snapForm: FormGroup): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      map(faceSnaps => [...faceSnaps].sort((a, b) => a.id - b.id)),
      map(sortedFaceSnaps => ({
        ...snapForm.value,
        id: sortedFaceSnaps[sortedFaceSnaps.length - 1].id + 1,
        snaps: 0,
        createdDate: new Date()
      })),
      switchMap(newFaceSnap => this.http.post<FaceSnap>(`${SERVER_BASE_URL}/facesnaps`, newFaceSnap))
    );
  }
}
