import { type } from 'os';
import { arrayBuffer } from 'stream/consumers';
import { create } from 'zustand';


interface Product {
	
	id: number;
	name: string; //name
	description: string; //description
}

interface ProductStore {
	products: Product[];
	getProduct: ()=>void;
	addProduct: (product: Product) => void;
	removeProduct: (id: number) => void;
	updateProduct: (id: number, updatedProduct: Partial<Product>) => void;
  }
  
export const useProductStore = create<ProductStore>((set) => ({
	products: [],
	getProduct: async () => {
		try {
			const res = await fetch('https://jsonplaceholder.typicode.com/comments/');
			const result = await res.json();
			let products:Product[] = []
			for (var r of result) {
				const product = { id: r.id, name: r.email, description: r.body }
				products.push(product)
			}
			set({products});
		} catch (err) {
			console.log('error', err)//dialog box
		}
	},
	
	addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  	removeProduct: (id) => set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
  	updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)),
    })),
}))