// test.ts
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Inicializa o ambiente de teste do Angular
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Importa todos os arquivos *.spec.ts automaticamente
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);
