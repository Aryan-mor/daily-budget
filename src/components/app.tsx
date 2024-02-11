import {h} from 'preact';
import {Route, Router} from 'preact-router';
import Home from '../routes/home';
import Walet from '../routes/walet';
import ActiveCurrencyContextWrapper from "../hooks/use-active-currency-code";
import StorageWrapper from "../hooks/use-storage/use-storage";
import {NextUIProvider} from "@nextui-org/react";

const App = () => (
    <NextUIProvider>
        <StorageWrapper>
            <ActiveCurrencyContextWrapper>
                <div id="app" className="dark text-foreground bg-background min-h-screen overflow-x-hidden">
                    {/*<Header/>*/}
                    <main>
                        <Router>
                            <Route path="/" component={Home} />
                            <Route path="/Index" component={Walet} />
                        </Router>
                    </main>
                </div>
            </ActiveCurrencyContextWrapper>
        </StorageWrapper>
    </NextUIProvider>
);

export default App;
