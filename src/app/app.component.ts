import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "pkmn-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <h1>Welcome to {{ title }}!</h1>

    <router-outlet></router-outlet>
  `,
  styleUrls: [],
})
export class AppComponent {
  title = "ng-pokemon-app";
}
