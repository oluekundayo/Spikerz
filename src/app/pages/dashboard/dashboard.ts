import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { NgClass } from '@angular/common';
import { TechniqueCard } from '../../components/technique-card/technique-card';
import { RiskCard } from '../../components/risk-card/risk-card';
import { NodesCard } from '../../components/nodes-card/nodes-card';
interface Asset {
  name: string;
  ip: string;
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
}
@Component({
  selector: 'app-dashboard',
  imports: [NgClass, TableModule, BadgeModule, ButtonModule, TechniqueCard, RiskCard, NodesCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  first: number = 1;
  last: number = 2;
  totalRecords: number = 2;
  description = signal(
    `Lorem ipsum dolor sit amet consectetur. Aenean sodales pellentesque gravida nibh et magna faucibus. Dui commodo ut metus amet egestas habitant viverra. Quisque fusce senectus facilisis non diam leo nulla sem pellentesque. Sit in vel sed cursus metus sit fringilla vestibulum.`
  );
  extra =
    signal(`Lorem ipsum dolor sit amet consectetur. Tempus a id adipiscing fames egestas tellus dis pretium tempus. Justo nisl nisl lorem lectus id ornare. Rhoncus in egestas in amet porttitor pellentesque sit. Amet gravida integer velit felis. Eu consectetur interdum auctor sed aliquam. Eu pulvinar accumsan sed id. Duis a aliquam eu quisque commodo lectus. Lectus ipsum velit purus viverra vulputate viverra in nunc nulla. Euismod rhoncus mauris urna orci gravida sagittis netus. Amet mus in vel etiam. Interdum habitant congue massa in etiam sit. Commodo nibh viverra lobortis augue lorem quam lorem suspendisse.
`);

  assetList = signal<Asset[]>([
    { name: 'Loremipsumdolorsit', ip: '192.168.1.1', risk: 'Critical' },
    { name: 'Loremipsumdolorsit002', ip: '192.168.1.2', risk: 'Critical' },
  ]);

  desList = signal([
    { name: 'Lorem ipsum dolor', des: '10/19/2017', checkbox: false },
    { name: 'Lorem ipsum dolor', des: 'Ut', checkbox: false },
    { name: 'Lorem ipsum dolor', des: 'Eros', checkbox: false },
    { name: 'Lorem ipsum dolor', des: 'Yes', checkbox: true },
    { name: 'Lorem ipsum dolor', des: 'Sit', checkbox: false },
    { name: 'Lorem ipsum dolor', des: 'Lorem ipsum dolor', checkbox: false },
    { name: 'Lorem ipsum dolor', des: 'Lorem ipsum dolor', checkbox: false },
  ]);

  flowNodes = signal([
    { label: 'Loremipsumm', type: 'start' },
    { label: 'Loremipsu', type: 'process' },
    { label: 'Loremipsu', type: 'process' },
    { label: 'Loremipsumdolorsit', ip: '192.168.1.1', type: 'end' },
    { label: 'Loremipsumdolorsit002', ip: '192.168.1.2', type: 'end' },
  ]);

  contextualRisk = signal({
    Critical: 2,
    High: 0,
    Medium: 0,
    Low: 0,
  });

  cardList = signal([
    {
      id: 1,
      title: 'Lorem t',
      detailHeader: 'Server',
      detailSubheader: 'Server',
      detailContent: 'Lorem ipsum dolor sit amet consectetur.',
      description: '',
    },
    {
      id: 2,
      title: 'Lorem s',
      detailHeader: 'Server',
      detailSubheader: 'Server',
      detailContent: 'Lorem ipsum dolor sit amet consectetur.',
      description: '',
    },
    {
      id: 3,
      title: 'Lorem t',
      detailHeader: 'Server',
      detailSubheader: 'Server',
      detailContent: 'Lorem ipsum dolor sit amet consectetur.',
      description: '',
    },
  ]);

  pageChange(d: any) {}

  nodes = signal([
    {
      img: 'images/node.svg',
      label: 'Loremipsumm',
      subLabel: 'User A',
      class: 'risk-safe',
      details: {
        image: false,
        ipAddress: [
          ['1.2.3.4', '1.2.3.4', '1.2.3.4'],
          ['1.2.3.4', '1.2.3.4', '1.2.3.4'],
        ],
        version: 'OS v12.1',
        zone: 'Local Network',
        protocol: 'HTTPS',
        description: 'Standard end-user machine accessing services.',
      },
    },
    {
      img: 'images/server.svg',
      label: 'Loremipsu',
      subLabel: '10.0.0.10',
      class: 'risk-safe',
      details: {
        image: true,
        ipAddress: [
          ['1.2.3.4'],
        ],
        version: 'Loremipsum',
        zone: 'Loremipsum Loremipsum',
        protocol: 'TCP/443',
        description: 'Lorem “ipsum"',
      },
    },
    {
      img: 'images/server.svg',
      label: 'Loremipsum',
      subLabel: '10.0.1.5',
      class: 'risk-safe',
      details: {
        image: true,
        ipAddress: [
          ['1.2.3.4'],
        ],
        version: 'NodeJS v18',
        zone: 'App Cluster',
        protocol: 'HTTP/8080',
        description: 'Lorem “ipsum"',
      },
    },
    {
      img: 'images/server-down.svg',
      label: 'Loremipsumdolorsit',
      subLabel: '192.168.1.1',
      class: 'risk-critical',
      details: {
        image: true,
        ipAddress: [
          ['1.2.3.4'],
        ],
        version: 'Postgres v14',
        zone: 'DB-EU',
        protocol: 'TCP/5432',
        description: 'Master database instance. Latency spike detected.',
      },
    },
    {
      img: 'images/server-down.svg',
      label: 'Loremipsumdolorsit002',
      subLabel: '192.168.1.2',
      class: 'risk-critical',
      details: {
        image: true,
        ipAddress: [
          ['1.2.3.4'],
        ],
        version: 'Loremipsum',
        zone: 'DB-EU',
        protocol: 'TCP/5432',
        description: 'Read replica instance. Failed replication.',
      },
    },
  ]);
  statusItems: any[] = [
    { icon: 'cross', text: 'Lorem', color: 'red' },
    { icon: 'warning', text: 'Lorem', color: 'orange' },
    { icon: 'check', text: 'Lorem', color: 'green' }
  ];
}
