import { Component, computed, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // For the circular gauge/spinner effect
import { NgClass, NgStyle } from '@angular/common';

// Interfaces (same as before)
export interface Asset {
  name: string;
  ip: string;
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface RiskSummary {
  Critical: number;
  High: number;
  Medium: number;
  Low: number;
}
const RISK_COLORS: Record<keyof RiskSummary, string> = {
  Critical: '#ef4444', // Red
  High: '#f97316',     // Orange
  Medium: '#3b82f6',   // Blue (for info/medium)
  Low: '#22c55e',      // Green
};

@Component({
  selector: 'app-risk-card',
  imports: [
    NgClass,
    CardModule,
    TableModule,
    TagModule,
    PaginatorModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './risk-card.html',
  styleUrl: './risk-card.css',
})
export class RiskCard {
  // Mock data to match the image
  assets = signal<Asset[]>([
    { name: 'Loremipsumdolorsit001', ip: '192.168.1.1', risk: 'Critical' },
    { name: 'Loremipsumdolorsit002', ip: '10.0.0.5', risk: 'Critical' },
  ]);

  riskSummary = computed<any>(() => {
  const summary= { Critical: 0, High: 0, Medium: 0, Low: 0 };
  this.assets().forEach(asset => {
    summary[asset.risk] += 1;
  });
  // console.log('object :>> ', summary);
  return summary;
});


  // Risk levels in display order
  riskLevels: (keyof RiskSummary)[] = ['Critical', 'High', 'Medium', 'Low'];

  // Total critical assets for display in the center of the gauge
  totalCritical = computed(() => this.riskSummary().Critical);

  // criticalRiskCount: number = this.riskSummary.Critical;
  conicGradientValue = signal<string>('conic-gradient(#e5e7eb 0% 100%)');
  constructor() {
    this.calculateConicGradient();
  }

  // Function to get the color for the PrimeNG Tag component
  getSeverity(risk: any): 'danger' | 'warn' | 'info' | 'success' {
    switch (risk) {
      case 'Critical':
        return 'danger'; // PrimeNG equivalent for red/critical
      case 'High':
        // CHANGE THIS: Use 'warn' instead of 'warning'
        return 'warn';
      case 'Medium':
        return 'info';
      case 'Low':
        return 'success';
      default:
        return 'success';
    }
  }

  // --- Pagination Logic for p-table and custom paginator ---
  first: number = 0; // The index of the first record to display
  rows: number = 2; // Number of items per page
  totalRecords: number = this.assets.length;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    // In a real application, you would slice your data or call a backend API here
  }
  calculateConicGradient(): void {
    const summary = this.riskSummary();
    
    // 1. Calculate the total number of assets
    const totalAssets = this.assets().length;

    if (totalAssets === 0) {
      // Set to a solid gray circle if no data exists
      this.conicGradientValue.set('conic-gradient(#e5e7eb 0% 100%)'); 
      return;
    }

    let gradientParts: string[] = [];
    let cumulativeDegrees = 0; 

    // 2. Iterate over risk levels in the desired order
    this.riskLevels.forEach(level => {
      const count = summary[level];
      if (count > 0) {
        // Calculate the segment size in degrees (360 degrees in a circle)
        const degrees = (count / totalAssets) * 360;
        
        const startDegree = cumulativeDegrees;
        // The last segment goes to 360 to prevent gaps
        const endDegree = (cumulativeDegrees + degrees > 359.99) ? 360 : cumulativeDegrees + degrees;

        const color = RISK_COLORS[level];

        // Format: [color] [start_degree]deg [end_degree]deg
        // 'from 90deg' (top) is added later in the final string for rotation
        gradientParts.push(`${color} ${startDegree}deg ${endDegree}deg`);

        // Update the cumulative degree for the next segment
        cumulativeDegrees += degrees;
      }
    });

    // 3. Build the final conic-gradient CSS value
    // 'from 90deg' makes the gradient start from the top center
    this.conicGradientValue.set(`conic-gradient(from 90deg, ${gradientParts.join(', ')})`);
  }

  // --- Helper function for Tag Styling (Tailwind version) ---
  getSeverityClass(risk: Asset['risk']): string {
    switch (risk) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Medium':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  }
  
}
