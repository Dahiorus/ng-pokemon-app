import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[pkmn-border-card]",
  standalone: true,
})
export class BorderCardDirective {
  constructor(private element: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
  }

  private initialColor: string = "#f5f5f5";
  private defaultColor: string = "#009688";
  private defaultHeight: number = 180;

  @Input("pkmn-border-card") borderColor?: string;

  @HostListener("mouseenter")
  onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  private setHeight(height: number) {
    this.element.nativeElement.style.height = `${height}px`;
  }

  private setBorder(color: string) {
    this.element.nativeElement.style.border = `solid 4px ${color}`;
  }
}
