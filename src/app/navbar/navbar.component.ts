import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarCollapsed = true;

  navLinks = [
    { path: "/bussiness-idea", label: "Business Idea" },
    { path: "/market-research", label: "Market Research" },
    { path: "/mvp-development", label: "MVP Development" },
    { path: "/marketing", label: "Marketing" },
    { path: "/sales-strategy", label: "Sales Strategy" },
    { path: "/business-setup", label: "Business Setup" },
    { path: "/financial-planning", label: "Financial Planning" },
    { path: "/launch-preparation", label: "Launch Preparation" }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeNavbar();
      }
    });
  }

  isWelcomePage(): boolean {
    return this.router.url === '/welcome';
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  closeNavbar() {
    if (window.innerWidth <= 768) { // يعمل فقط في الشاشات الصغيرة
      this.isNavbarCollapsed = true;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const navbar = document.querySelector('.nav-links');
    const toggler = document.querySelector('.menu-toggle');
  
    if (
      window.innerWidth <= 768 &&
      navbar &&
      !navbar.contains(event.target as Node) &&
      !toggler?.contains(event.target as Node) // ✅ استخدام ?. لتجنب الخطأ عند كونه null
    ) {
      this.isNavbarCollapsed = true;
    }
  }
  
}
