import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import { provideHttpClient, withFetch } from '@angular/common/http'
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

const myPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{sky.50}',
            100: '{sky.100}',
            200: '{sky.200}',
            300: '{sky.300}',
            400: '{sky.400}',
            500: '{sky.500}',
            600: '{sky.600}',
            700: '{sky.700}',
            800: '{sky.800}',
            900: '{sky.900}',
            950: '{sky.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{sky.700}',
                    inverseColor: '#ffffff',
                    hoverColor: '{sky.900}',
                    activeColor: '{sky.800}'
                },
                highlight: {
                    background: '{sky.950}',
                    focusBackground: '{sky.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            },
            dark: {
                primary: {
                    color: '{sky.50}',
                    inverseColor: '{sky.950}',
                    hoverColor: '{sky.100}',
                    activeColor: '{sky.200}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: '#ffffff',
                    focusColor: 'rgba(255,255,255,.87)'
                }
            }
        }
    }
})

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withFetch()),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideAnimationsAsync(),
        provideRouter(routes),
        providePrimeNG({
            theme: {
                preset: myPreset,
                options: {
                    darkModeSelector: '.my-app-dark'
                }
            }
        })
    ]
};
