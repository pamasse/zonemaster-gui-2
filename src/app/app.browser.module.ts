import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [AppModule],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}
