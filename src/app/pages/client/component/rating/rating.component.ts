import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  @Input() rating: number = 0;
  get numStars(): number {
    return Math.floor(this.rating);
  }

  get ratingFraction(): number {
    return this.rating - this.numStars;
  }

  get stars(): any[] {
    return new Array(5);
  }
}
