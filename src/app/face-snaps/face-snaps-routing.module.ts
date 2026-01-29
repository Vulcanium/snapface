import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FaceSnapListComponent } from "./components/face-snap-list/face-snap-list.component";
import { NewFaceSnapComponent } from "./components/new-face-snap/new-face-snap.component";
import { SingleFaceSnapComponent } from "./components/single-face-snap/single-face-snap.component";

const routes: Routes = [
    { path: 'create', component: NewFaceSnapComponent }, // Equivalent to facesnaps/create (must be defined before the ':id' route to avoid 'create' being treated as an id)
    { path: ':id', component: SingleFaceSnapComponent }, // Equivalent to facesnaps/:id
    { path: '', component: FaceSnapListComponent }, // Equivalent to facesnaps
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class FaceSnapsRoutingModule { }