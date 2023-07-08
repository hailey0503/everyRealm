import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useProductStore } from "../store/store"
import styles from "../styles/Home.module.css";

const [products, getProduct, addProduct, removeProduct, updateProduct] = useProductStore(
	(state) => [
		state.products,
		state.getProduct,
		state.addProduct,
		state.removeProduct,
		state.updateProduct,
	])

interface FormData {
	id: number;
	name: string;
	description: string;
}

const [formData, setFormData] = useState<FormData>({
	id: 0,
	name: '',
	description: '',
});
const Form: React.FC = () => {
	const handleAddProduct = (event: FormEvent) => {
		event.preventDefault();
		const newProduct = {

			id: formData.id, // You can use a more sophisticated ID generation logic
			name: formData.name,
			description: formData.description,
		};
		addProduct(newProduct);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

		const { name, value } = event.target;
		console.log(event.target)
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleCancel = () => {

	};

	const handleSave = () => {
		// Handle save logic with formValues
		console.log(formData);
	};

	return (
		<div className="flex flex-col h-full">
			<div className="mb-4">
				<label htmlFor="name" className="text-right w-1/4">
					Name:
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className="border rounded px-2 py-1 w-3/4"
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="id" className="text-right w-1/4">
					ID:
				</label>
				<input
					type="text"
					id="id"
					name="id"
					value={formData.id}
					onChange={handleChange}
					className="border rounded px-2 py-1 w-3/4"
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="description" className="text-right w-1/4">
					Description:
				</label>
				<textarea
					id="description"
					name="description"
					value={formData.description}
					onChange={handleChange}
					className="border rounded px-2 py-1 w-3/4"
				/>
			</div>
			<div className="mt-auto flex justify-end">
				<button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={handleCancel}>
					Cancel
				</button>
				<button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
					Save
				</button>
			</div>
		</div>
	)
}

export default Form;