import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
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
import { IdeaSuggestionComponent } from './components/idea-suggestion/idea-suggestion.component';
import { Nl2brPipe } from './pipes/nl2br.pipe';
import { TranslatePipe } from './pipes/translate.pipe';
import { ApisService } from './services/apis.service';
import { AuthComponent } from './auth/auth.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AddBusinessComponent } from './add-business/add-business.component';
import { TestingYourIdeaComponent } from './testing-your-idea/testing-your-idea.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { MvpComponent } from './tab/mvp/mvp.component';
import { MvpSuggestionComponent } from './components/mvp-suggestion/mvp-suggestion.component';
import { NewMarketingComponent } from './tab/new-marketing/new-marketing.component';
import { NewSalesComponent } from './tab/new-sales/new-sales.component';
import { NewBusinessSetupComponent } from './tab/new-business-setup/new-business-setup.component';
import { AddPlansComponent } from './add-plans/add-plans.component';
import { NewFinancialComponent } from './tab/new-financial/new-financial.component';
import { WebsiteComponent } from './tab/website/website.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    BussinessIdeaComponent,
    MarketResearchComponent,
    MvpDevelopmentComponent,
    MarketingComponent,
    SalesStrategyComponent,
    BussinessSetupComponent,
    FinancialPlaningComponent,
    LaunchPreprationComponent,
    GetStartedComponent,
    WelcomeComponent,
    IdeaSuggestionComponent,
    Nl2brPipe,
    TranslatePipe,
    AuthComponent,
    LandingPageComponent,
    AddBusinessComponent,
    TestingYourIdeaComponent,
    HelpDialogComponent,
    MvpComponent,
    MvpSuggestionComponent,
    NewMarketingComponent,
    NewSalesComponent,
    NewBusinessSetupComponent,
    AddPlansComponent,
    NewFinancialComponent,
    WebsiteComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  providers: [ApisService],
  bootstrap: [AppComponent],
})
export class AppModule { }
