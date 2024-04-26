import {
  createResource,
  createSignal,
  Show,
  For,
  createEffect,
} from "solid-js";
import { JSX } from "solid-js";

import { useParams } from "@solidjs/router";

import { ParentProps } from "solid-js";
import { IProduct, IProductResponse } from "../types/types";

interface CardProps {
  product?: IProduct;
  onClick?: (product: IProduct) => void;
  children?: JSX.Element;
  class?: string;
}

const Card = (props: ParentProps<CardProps>) => (
  <div class={props.class}>{props.children}</div>
);

const fetchProducts = async () => {
  const response = await fetch(
    "https://candy-shop-rest-api.onrender.com/products"
  );
  if (!response.ok) throw new Error("Network response was not ok");
  return (await response.json()).data;
};

const fetchProduct = async (id: string) => {
  try {
    const response = await fetch(
      `https://candy-shop-rest-api.onrender.com/products/${id}`
    );
    if (!response.ok) throw new Error("Error fetching product");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null; // Return null or a default state in case of an error
  }
};

export default function Home() {
  const [products] = createResource<IProduct[]>(fetchProducts);
  const [productId, setProductId] = createSignal();
  const [selectedProduct, setSelectedProduct] = createSignal<
    IProduct | undefined
  >();
  const params = useParams();

  const [isModalOpen, setModalOpen] = createSignal(false);

  const openModal = (product: IProduct) => {
    setProductId(product.id); // This is correct, assuming product.id exists
    setSelectedProduct(product); // Now setting the selected product here
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(undefined); // Correctly setting the selectedProduct to undefined
  };

  return (
    <div class="flex justify-center items-center min-h-screen">
      <Show when={Array.isArray(products())} fallback={<p>Loading...</p>}>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4 w-full max-w-6xl">
          <For each={products()}>
            {(product: IProduct) => (
              <Card class="card rounded shadow-lg transform transition duration-500 hover:scale-105">
                <div
                  class="rounded overflow-hidden cursor-pointer"
                  onClick={() => openModal(product)}
                >
                  <img
                    src={
                      product.images
                        ? `https://bortakvall.se/${product.images.thumbnail}`
                        : "default-thumbnail.jpg"
                    }
                    alt="product image"
                    class="w-full"
                  />
                  <div class="p-4">
                    <h1 class="text-lg font-bold">{product.name}</h1>
                  </div>
                </div>
              </Card>
            )}
          </For>
        </div>
      </Show>

      <Show when={isModalOpen()}>
        <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div class="bg-white p-5 rounded-lg max-w-lg w-full">
            <Show when={selectedProduct()}>
              {(product) => (
                <>
                  <h3 class="text-2xl font-bold mb-4">{product.name}</h3>
                  <img
                    src={`https://bortakvall.se/${product().images?.thumbnail}`}
                    alt="product image"
                    class="mb-4"
                  />
                  <p innerHTML={product().description} />
                  <p class="my-7 text-2xl">Only £{product().price}</p>
                  <button onClick={closeModal} class="btn mt-4">
                    Close
                  </button>
                </>
              )}
            </Show>
          </div>
        </div>
      </Show>
    </div>
  );
}
