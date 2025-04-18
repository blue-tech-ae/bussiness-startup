import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BussinessIdeaComponent } from './tab/bussiness-idea/bussiness-idea.component';
import { MarketResearchComponent } from './tab/market-research/market-research.component';
import { MvpDevelopmentComponent } from './tab/mvp-development/mvp-development.component';
import { MarketingComponent } from './tab/marketing/marketing.component';
import { SalesStrategyComponent } from './tab/sales-strategy/sales-strategy.component';
import { BussinessSetupComponent } from './tab/bussiness-setup/bussiness-setup.component';
import { FinancialPlaningComponent } from './tab/financial-planing/financial-planing.component';
import { LaunchPreprationComponent } from './tab/launch-prepration/launch-prepration.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthComponent } from './auth/auth.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TestingYourIdeaComponent } from './testing-your-idea/testing-your-idea.component';
import { MvpComponent } from './tab/mvp/mvp.component';
import { NewMarketingComponent } from './tab/new-marketing/new-marketing.component';
import { NewSalesComponent } from './tab/new-sales/new-sales.component';
import { authGuard } from './auth.guard';

// const routes: Routes = [
//   { path: '', component: GetStartedComponent },
  
//   { path: 'bussiness-idea', component: BussinessIdeaComponent },
//   { path: 'market-research', component: MarketResearchComponent },
//   { path: 'start-simple', component: MvpComponent },
//   { path: 'marketing', component: NewMarketingComponent },
//   { path: 'sales-strategy', component: NewSalesComponent },
//   { path: 'business-setup', component: BussinessSetupComponent },
//   { path: 'financial-planning', component: FinancialPlaningComponent },
//   { path: 'launch-preparation', component: LaunchPreprationComponent },
//   {path:"welcome",component:WelcomeComponent},
//   {path:"landing-page",component:LandingPageComponent},
//   {path:"test-your-idea",component:TestingYourIdeaComponent},
//   {path:"auth",component:AuthComponent}
// ];
const routes: Routes = [
  { path: '', component: GetStartedComponent },
  { path: 'bussiness-idea', component: BussinessIdeaComponent, canActivate: [authGuard] },
  { path: 'market-research', component: MarketResearchComponent, canActivate: [authGuard] },
  { path: 'start-simple', component: MvpComponent, canActivate: [authGuard] },
  { path: 'marketing', component: NewMarketingComponent, canActivate: [authGuard] },
  { path: 'sales-strategy', component: NewSalesComponent, canActivate: [authGuard] },
  { path: 'business-setup', component: BussinessSetupComponent, canActivate: [authGuard] },
  { path: 'financial-planning', component: FinancialPlaningComponent, canActivate: [authGuard] },
  { path: 'launch-preparation', component: LaunchPreprationComponent, canActivate: [authGuard] },
  { path: "welcome", component: WelcomeComponent },
  { path: "landing-page", component: LandingPageComponent },
  { path: "test-your-idea", component: TestingYourIdeaComponent, canActivate: [authGuard] },
  { path: "auth", component: AuthComponent }
];

@NgModule({
  
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
