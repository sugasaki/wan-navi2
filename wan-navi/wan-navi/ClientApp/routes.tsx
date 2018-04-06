import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { MapWanNavi } from './components/Map';
import { MapMarker } from './components/MapMarker';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/Map' component={MapWanNavi} />
    <Route path='/MapMarker' component={MapMarker} />
</Layout>;
