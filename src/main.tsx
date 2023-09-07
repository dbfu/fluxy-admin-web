import ReactDOM from 'react-dom/client'
import NProgress from 'nprogress';
import * as Sentry from '@sentry/react';
import React from "react";
import App from './app'

import 'virtual:windi.css'
import 'nprogress/nprogress.css';

import './overwrite.css'
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router-dom';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
  parent: '#root'
});

Sentry.init({
  dsn: "https://e9ed02b6addc84a7bd666ecec261434b@o4505777802444800.ingest.sentry.io/4505833754787840",
  integrations: [
    new Sentry.BrowserTracing({
      // See docs for support of different versions of variation of react router
      // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
    new Sentry.Replay()
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,
  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
