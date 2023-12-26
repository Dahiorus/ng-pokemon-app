import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "pkmn-page-not-found",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./page-not-found.component.html",
})
export class PageNotFoundComponent {}
