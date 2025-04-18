import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  sections = [
    {
      title: 'Business Idea',
      description: 'Define your business concept and align it with your skills and passions',
      icon: 'fa-lightbulb',
      link: '/bussiness-idea'
    },
    {
      title: 'Market Research',
      description: 'Analyze your target market and competition',
      icon: 'fa-chart-line',
      link: '/market-research'
    },
    {
      title: 'MVP Development',
      description: 'Plan and create your minimum viable product',
      icon: 'fa-code',
      link: '/mvp-development'
    },
    {
      title: 'Marketing',
      description: 'Develop your marketing strategy and channels',
      icon: 'fa-bullhorn',
      link: '/marketing'
    },
    {
      title: 'Sales Strategy',
      description: 'Create your sales plan and revenue model',
      icon: 'fa-dollar-sign',
      link: '/sales-strategy'
    },
    {
      title: 'Business Setup',
      description: 'Handle legal requirements and business formation',
      icon: 'fa-building',
      link: '/business-setup'
    },
    {
      title: 'Financial Planning',
      description: 'Manage your budget and financial projections',
      icon: 'fa-chart-pie',
      link: '/financial-planning'
    },
    {
      title: 'Launch Preparation',
      description: 'Plan and execute your business launch',
      icon: 'fa-rocket',
      link: '/launch-preparation'
    }
  ];
} 