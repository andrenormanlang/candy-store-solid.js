import { useParams } from "@solidjs/router";
import { Show, createResource } from "solid-js";
import { Spinner, SpinnerType } from "solid-spinner";

const fetchProduct = async (id: string) => {
  const res = await fetch(`https://candy-shop-rest-api.onrender.com/products/${id}`);
  if (!res.ok) {
    throw new Error('Error fetching product');
  }
  const product = await res.json();
  console.log('product', product);
  return product; // Return the already parsed product
};
export default function Product() {
  const params = useParams();
  const [product] = createResource(params.id, fetchProduct);

  return (
    <div class="my-7">
      <Show when={product()} fallback={<Spinner type={SpinnerType.hearts} stroke-opacity=".125" />}>
        <div class="grid grid-cols-5 gap-7">
          <div class="col-span-2">
            {/* Make sure to access the thumbnail within the data object */}
            <img src={`https://bortakvall.se/${product().data.images.thumbnail}`} alt="product image" />
          </div>
          <div class="col-span-3">
            {/* Same here, access the properties within the data object */}
            <h2 class="text-3xl font-bold mb-7">{product().data.name}</h2>
            {/* Check if description needs to be parsed as HTML or not */}
            <p innerHTML={product().data.description} />
            <p class="my-7 text-2xl">Only kr{product().data.price}</p>
          </div>
        </div>
      </Show>
    </div>
  );
}
