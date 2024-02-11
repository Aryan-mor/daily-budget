import {render} from 'preact';
import {LocationProvider, Router, Route} from 'preact-iso';
import Home from './pages/Home/index.jsx';
import Walet from './pages/Walet/index';
import {NotFound} from './pages/_404.jsx';
import './style.css';
import ActiveCurrencyContextWrapper from "./hooks/use-active-currency-code";
import StorageWrapper from "./hooks/use-storage/use-storage";
import {NextUIProvider} from "@nextui-org/react";

export function App() {
    return (
        <NextUIProvider>
            <LocationProvider>
                <StorageWrapper>
                    <ActiveCurrencyContextWrapper>
                        {/*<Header />*/}
                        <main className="dark text-foreground bg-background min-h-screen overflow-x-hidden">
                            <Router>
                                <Route path="/" component={Home}/>
                                <Route path="/walet" component={Walet}/>
                                <Route default component={NotFound}/>
                            </Router>
                        </main>
                    </ActiveCurrencyContextWrapper>
                </StorageWrapper>
            </LocationProvider>
        </NextUIProvider>
    );
}

render(<App/>, document.getElementById('app'));
