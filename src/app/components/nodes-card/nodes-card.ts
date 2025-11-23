import { NgClass } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';

interface Node {
  x: number;
  y: number;
  width: number;
  height: number;
  img: string;
  label: string;
  subLabel?: string;
  class: string;
}
interface NodeDetails {
  ipAddress: string[][];
  version: string;
  zone: string;
  protocol: string;
  description: string;
  image: boolean;
}

interface BaseNode {
  label: string;
  subLabel?: string;
  class: string;
  img: string;
  details: NodeDetails;
}

interface RenderedNode extends BaseNode {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Arrow {
  x: number;
  y: number;
  width: number;
  height: number;
  img: string;
}

@Component({
  selector: 'app-nodes-card',
  imports: [NgClass],
  templateUrl: './nodes-card.html',
  styleUrl: './nodes-card.css',
})
export class NodesCard {
  selectedNode = signal<RenderedNode | null>(null);
  selectedNodeX = signal(0);
  selectedNodeY = signal(0);

  @Input({ required: true }) nodes: BaseNode[] = [];

  readonly NODE_WIDTH = 56;
  readonly NODE_HEIGHT = 56;

  readonly POSITIONS = [
    { x: 72, y: 72 },
    { x: 272, y: 72 },
    { x: 472, y: 72 },
    { x: 672, y: 2 },
    { x: 672, y: 142 },
  ];

  renderedNodes = computed<RenderedNode[]>(() => {
    return this.nodes.map((baseNode, index) => {
      const pos = this.POSITIONS[index] || { x: 0, y: 0 };

      return {
        ...baseNode,
        id: index + 1,
        x: pos.x,
        y: pos.y,
        width: this.NODE_WIDTH,
        height: this.NODE_HEIGHT,
      } as RenderedNode;
    });
  });
  arrows: Arrow[] = [
    { x: 140, y: 80, width: 80, height: 40, img: 'images/arrow.svg' },
    { x: 340, y: 80, width: 80, height: 40, img: 'images/arrow.svg' },
    { x: 535, y: 55, width: 120, height: 90, img: 'images/nav-arrow.svg' },
  ];
  showModalOnHover(node: RenderedNode, index: number) {
    this.selectedNode.set(node);
    if (index === 3 || index === 4) {
      this.selectedNodeX.set(node.x - 420);
      this.selectedNodeY.set(node.y + 20);
    } else {
      this.selectedNodeX.set(node.x);
      this.selectedNodeY.set(node.y + 50);
    }
  }
  hideModalOnHover() {
    this.selectedNode.set(null);
  }
}
