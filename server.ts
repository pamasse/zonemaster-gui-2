// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { join } from 'path';

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/server/main`);

enableProdMode();

const app = express();

// Set the engine
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set('view engine', 'html');

app.get('/**/*', (req: any, res: any) => {
  res.render(join(DIST_FOLDER, 'browser', 'index'), {
    req,
    res
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Static Assets
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// Point all routes to Universal
app.get('*', (req: any, res: any) => {
  res.render('index', { req });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
