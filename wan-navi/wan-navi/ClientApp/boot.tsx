import 'core-js/fn/promise'; //IE11 compatible

import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import * as RoutesModule from './routes';

//import * as ReactLeaflet from 'react-leaflet';


//import Leaflet from 'leaflet';
//delete L.Icon.Default.prototype._getIconUrl;
//L.Icon.Default.mergeOptions({
//    iconRetinaUrl: require('../node_modules/leaflet/dist/images/marker-icon-2x.png'),
//    iconUrl: require('../node_modules/leaflet/dist/images/marker-icon.png'),
//    shadowUrl: require('../node_modules/leaflet/dist/images/marker-shadow.png'),
//});


// leaflet css
//import '../node_modules/leaflet/dist/leaflet.css';


let routes = RoutesModule.routes;
    
function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter children={ routes } basename={ baseUrl } />
        </AppContainer>,
        document.getElementById('react-app')
    );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require<typeof RoutesModule>('./routes').routes;
        renderApp();
    });
}
