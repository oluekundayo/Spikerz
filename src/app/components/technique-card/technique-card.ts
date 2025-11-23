import { Component, input } from '@angular/core';

interface CardData {
  id: number;
  title: string;
  detailHeader: string;
  detailSubheader: string;
  detailContent: string;
  description: string;
}


@Component({
  selector: 'app-technique-card',
  imports: [],
  templateUrl: './technique-card.html',
  styleUrl: './technique-card.css',
})
export class TechniqueCard {
cardData = input<CardData[]>()
}
