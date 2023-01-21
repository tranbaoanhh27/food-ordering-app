import Meals from "./components/meals/Meals";
import Header from "./components/ui/Header";
import { CartContextProvider } from "./context/cart-context";

function App() {
    return (
        <CartContextProvider>
            <Header />
            <main>
                <Meals />
            </main>
        </CartContextProvider>
    );
}

export default App;
