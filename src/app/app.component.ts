import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: "pkmn-root",
  standalone: true,
   imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: "./app.component.html",
})
export class AppComponent {}
