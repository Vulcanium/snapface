import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FaceSnap } from '../models/face-snap.model';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  faceSnaps: FaceSnap[] = [
    {
      id: 1,
      title: 'Archibald',
      description: 'My best friend since childhood!',
      imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      createdDate: new Date(),
      snaps: 47,
      location: 'Paris'
    },
    {
      id: 2,
      title: 'Three Rock Mountain',
      description: 'A beautiful place for hiking.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Three_Rock_Mountain_Southern_Tor.jpg/2880px-Three_Rock_Mountain_Southern_Tor.jpg',
      createdDate: new Date(),
      snaps: 6,
      location: 'The mountain'
    },
    {
      id: 3,
      title: 'Un bon repas',
      description: 'Mmm, delicious!',
      imageUrl: 'https://wtop.com/wp-content/uploads/2020/06/HEALTHYFRESH.jpg',
      createdDate: new Date(),
      snaps: 156
    },
    {
      id: 4,
      title: 'Duck',
      description: 'Tastes better as a confit...',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXMgI-33QnVxrqZYy2KX7ztZ81ecLAi1lF6JWH4ZTTESbxNwfDwfEbAQi_kM35jvLuDMS7vIeVnhwKKc1I8r8lbEPdm5eg8Uos378NBXBENpUah4C9PNRzoIXSQ&s=10&ec=121516186',
      createdDate: new Date(),
      snaps: 202
    }
  ];

  getAllFaceSnaps(): FaceSnap[] {
    return this.faceSnaps;
  }

  getFaceSnapById(faceSnapId: number): FaceSnap {
    const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
    if (!faceSnap) {
      throw new Error('FaceSnap not found!');
    } else {
      return faceSnap;
    }
  }

  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): void {
    const faceSnap = this.getFaceSnapById(faceSnapId);
    snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
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
