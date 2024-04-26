import { createSignal } from "solid-js";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import { IoCartOutline } from "solid-icons/io";
import { NavLink, Route, Routes } from "@solidjs/router";


const [cartItems, setCartItems] = createSignal([]);

function App() {
  const [darkTheme, setDarkTheme] = createSignal(false);

  function toggleTheme() {
    setDarkTheme(!darkTheme());
  }

  return (
    <>
      <div
        class={` container-nav container m-auto ${
          darkTheme() ? "bg-neutral-900 text-white" : "bg-white text-black"
        }`}
      >
        <header class="bg-red-600 sticky top-0 z-50 my-4 p-2 text-xl flex items-center justify-between">
          <div>
            <div class="flex">

            <button
              onClick={toggleTheme}
              class="material-symbols-outlined cursor-pointer ml-4"
            >
              {darkTheme() ? "dark_mode" : "light_mode"}
            </button>
            <a class="navbar-brand" href="/">
              <img src="src/assets/logo.svg" class="max-h-9 ml-2" alt="Pixie Pops Logo" />
            </a>

            </div>
          </div>
          <nav>
            {/* <NavLink href="/" end class="mx-2">Home</NavLink> */}
            <NavLink href="/cart" class="mx-6 mr-6">
              <IoCartOutline size={30} />
            </NavLink>
            {/* <NavLink href="/product" class="mx-2">Products</NavLink> */}
          </nav>
        </header>

        <div class="rounded-md text-center py-6">
          {/* <h1 class="banner-text">
            <span class="word">
              <span>P</span>
              <span>I</span>
              <span>X</span>
              <span>I</span>
              <span>E</span>
            </span>
            <span class="word">
              <span>P</span>
              <span>O</span>
              <span>P</span>
            </span>
          </h1> */}
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
