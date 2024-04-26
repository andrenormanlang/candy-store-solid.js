import { createSignal } from "solid-js";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import { IoCartOutline } from 'solid-icons/io'
import { NavLink, Route, Routes } from "@solidjs/router";

function App() {
  const [darkTheme, setDarkTheme] = createSignal(false);

  function toggleTheme() {
    setDarkTheme(!darkTheme());
  }

  return (
    <>
      <div class={`container m-auto ${darkTheme() ? 'bg-neutral-900 text-white' : 'bg-white text-black'}`}>
        <header class="my-4 p-2 text-xl flex items-center justify-between">
          <div>
            <button onClick={toggleTheme} class="material-symbols-outlined cursor-pointer">
              {darkTheme() ? 'dark_mode' : 'light_mode'}
            </button>
          </div>
          <nav>
            {/* <NavLink href="/" end class="mx-2">Home</NavLink> */}
            <NavLink href="/cart" class="mx-2"><IoCartOutline /></NavLink>
            {/* <NavLink href="/product" class="mx-2">Products</NavLink> */}
          </nav>
        </header>

        <div class="rounded-md text-center py-6">
          <h1 class="banner-text">
            <span class="word">
              <span>P</span>
              <span>I</span>
              <span>X</span>
              <span>I</span>
              <span>E</span>
            </span>
            {/* Adding a space between words */}
            <span class="word">
              <span>P</span>
              <span>O</span>
              <span>P</span>
            </span>
          </h1>
        </div>

        <Routes>
          <Route path="/" component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/product/:id" component={Product} />
        </Routes>
      </div>
    </>
  );
}

export default App;
