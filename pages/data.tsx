import { useProductStore } from "../store/store"
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import styles from "../styles/Home.module.css";
import Toast from "@/components/toast";
import Card from "@/components/card"
import Modal from "@/components/modal"
import LoadingSpinner from "@/components/loadingSpinner"
import Form from "@/components/form"
import { Container } from "postcss";


export default function Data() {

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

	const [showModal, setShowModal] = useState(false)
	const [showAddedToast, setAddedToast] = useState(false)
	const [showRemoveToast, setRemoveToast] = useState(false)
	const [showCancelToast, setCancelToast] = useState(false)
	const [showUpdateToast, setUpdateToast] = useState(false)
	const [showSpinner, setShowSpinner] = useState(false)
	const [isVisible, setIsVisible] = useState(false);



	useEffect(() => {
		getProduct();
	}, [getProduct]);

	const handleAddProduct = (event: FormEvent) => {
		event.preventDefault();
		const newProduct = {

			id: formData.id, // You can use a more sophisticated ID generation logic
			name: formData.name,
			description: formData.description,
		};
		addProduct(newProduct);
		setShowModal(false);
		onClickShowAddToast();
		//setShowSpinner(true);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

		const { name, value } = event.target;
		console.log(event.target)
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

	};

	const onClickShowModal = () => {
		setShowModal(true);
	}
	const onClickShowAddToast = () => {
		setAddedToast(true);
	};


	const handleCancel = () => {
		setShowModal(false);
		setCancelToast(true);
	};


	const handleRemoveProduct = (id: number) => {
		removeProduct(id);
		setRemoveToast(true)
	};

	const handleUpdateProduct = (id: number) => {
		const updatedProduct = {
			name: 'Updated Product',
		};
		updateProduct(id, updatedProduct);
		setUpdateToast(true)
	};

	const handleLinkClick = () => {
		setIsVisible(!isVisible);
	};

	return (
		<main className="main">
			<div className="product">
				<div className="min-w-full">
					<div className="addForm">
						<Modal isOpen={showModal} onClose={() => { setShowModal(false) }} >
							<div className="flex flex-col h-full bg-[#CCD5AE] pd-30">
								<div className="mb-4  bg-[#CCD5AE]">
									<label htmlFor="id" className="text-right w-1/4 text-[#6096B4]">
										ID:
									</label>
									<input
										type="text"
										id="id"
										name="id"
										value={formData.id}
										onChange={handleChange}
										className="border rounded px-2 py-1 w-3/4 float-right bg-[#CCD5AE]"
									/>
								</div>
								<div className="mb-4">
									<label htmlFor="name" className="text-right w-1/4 text-[#6096B4]">
										Name:
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										className="border rounded px-2 py-1 w-3/4 float-right  bg-[#CCD5AE]"
									/>
								</div>

								<div className="mb-4">
									<label htmlFor="description" className="text-right w-1/4 text-[#6096B4]">
										Description:
									</label>
									<textarea
										id="description"
										name="description"
										value={formData.description}
										onChange={handleChange}
										className="border rounded px-2 py-1 w-3/4 float-right  bg-[#CCD5AE]"
									/>
								</div>
								<div className="mt-auto flex justify-end flex space-x-2">
									<button className="bg-transparent hover:bg-[#6096B4] text-[#6096B4] font-semibold hover:text-white py-2 px-4 border border-[#6096B4] hover:border-transparent rounded" onClick={handleCancel}>
										Cancel
									</button>
									<button className="bg-transparent hover:bg-[#6096B4] text-[#6096B4] font-semibold hover:text-white py-2 px-4 border border-[#6096B4] hover:border-transparent rounded" onClick={handleAddProduct}>
										Save
									</button>
								</div>
							</div>
						</Modal>
						<div className="container mx-auto"><button className="bg-transparent hover:bg-[#6096B4] text-[#6096B4] font-semibold hover:text-white py-2 px-4 border border-[#6096B4] hover:border-transparent rounded" onClick={onClickShowModal}>Add Product</button></div>

					</div>
				</div>
				<div>
					{showAddedToast ? <Toast message="Item is successfully added" level="Success" onClose={() => { setAddedToast(false) }} /> : <></>}
					{showCancelToast ? <Toast message="Cancelled" level="Warning" onClose={() => { setCancelToast(false) }} /> : <></>}
					{showSpinner ? <LoadingSpinner /> : <></>}
				</div>
				<div className="flex flex-wrap">
					<ul className="productList">
						{products.map((product) => (
							<div key={product.id}>
								<div className="flex flex-col space-y-4">
									<a
										href="#!"
										py-10
										onClick={handleLinkClick}
										className="text-[#6096B4] transition duration-150 ease-in-out hover:text-primary-600 focus:text-[#BDCDD6] active:text-primary-700 dark:active:text-primary-600 pt-5 pb-2"
									>{product.name}</a>
								</div>



								<div className="flex space-x-2">
									<button className="bg-transparent hover:bg-[#6096B4] text-[#6096B4] font-semibold hover:text-white py-2 px-4 border border-[#6096B4] hover:border-transparent rounded" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
									<button className="bg-transparent hover:bg-[#6096B4] text-[#6096B4] font-semibold hover:text-white py-2 px-4 border border-[#6096B4] hover:border-transparent rounded" onClick={() => handleUpdateProduct(product.id)}>Update</button>
								</div>
								<div className={`card ${isVisible ?
									<Card
										id={product.id}
										name={product.name}
										description={product.description}
									/> : ''}`}>

								</div>



							</div>
						))}
					</ul>
					{showRemoveToast ? <Toast message="Item is successfully removed" level="Error" onClose={() => { setRemoveToast(false) }} /> : <></>}
					{showUpdateToast ? <Toast message="Item is successfully updated" level="Info" onClose={() => { setUpdateToast(false) }} /> : <></>}
				</div>
			</div>
		</main>
	)
}