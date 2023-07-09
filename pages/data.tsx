import { useProductStore } from "../store/store"
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import styles from "../styles/Home.module.css";
import Toast from "@/components/toast";
import Card from "@/components/card"
import Modal from "@/components/modal"
import LoadingSpinner from "@/components/loadingSpinner"



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
		imageSrc: string;
	}

	const [formData, setFormData] = useState<FormData>({
		id: 0,
		name: '',
		description: '',
		imageSrc: ''
	});

	const [showModal, setShowModal] = useState(false)
	const [showUpdateModal, setShowUpdateModal] = useState(false)
	const [showAddedToast, setAddedToast] = useState(false)
	const [showRemoveToast, setRemoveToast] = useState(false)
	const [showCancelToast, setCancelToast] = useState(false)
	const [showUpdateToast, setUpdateToast] = useState(false)
	const [showSpinner, setShowSpinner] = useState(false)
	const [isVisible, setIsVisible] = useState(false);
	const [curId, setCurID] = useState(0)
	const [curName, setCurName] = useState('')
	const [curUrl, setCurUrl] = useState('')
	const [curDescription, setCurDescription] = useState('')



	useEffect(() => {
		async function fetchProduct() {
			setShowSpinner(true);
			await getProduct();
			setShowSpinner(false);

		}
		fetchProduct();

	}, [getProduct]);

	const handleAddProduct = (event: FormEvent) => {
		event.preventDefault();
		const newProduct = {
			id: formData.id, // You can use a more sophisticated ID generation logic
			name: formData.name,
			description: formData.description,
			imageSrc: formData.imageSrc
		};
		addProduct(newProduct);
		setShowModal(false);
		resetFormData();
		onClickShowAddToast();


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
	const handleCancelUpdate = () => {
		setShowUpdateModal(false);
		setCancelToast(true);
	}

	const handleRemoveProduct = (id: number) => {
		removeProduct(id);
		setRemoveToast(true)
	};

	const handleUpdateProduct = (event: FormEvent) => {
		console.log('fd', formData)
		const updatedProduct = {
			name: formData.name ? formData.name : curName,
			imageSrc: formData.imageSrc ? formData.imageSrc : curUrl,
			description: formData.description ? formData.description : curDescription,

		};
		updateProduct(curId, updatedProduct);
		setShowUpdateModal(false);
		resetFormData();
		setUpdateToast(true)
	};

	const handleLinkClick = () => {
		setIsVisible(!isVisible);
	};

	const resetFormData = () => {
		setFormData({
			id: 0,
			name: '',
			description: '',
			imageSrc: ''
		})


	}

	return (
		<main className="main">
			{showSpinner ? <LoadingSpinner /> : <></>}
			<div className="product">
				<div className="min-w-full">
					<div className="addForm">
						<Modal isOpen={showModal} onClose={() => { setShowModal(false); resetFormData() }} >
							<div className="flex flex-col h-full bg-[white] pd-30">
								<div className="mb-4 bg-[white]">
									<label htmlFor="id" className="text-right w-1/4 text-[#6096B4]">
										ID:
									</label>
									<input
										type="number"
										id="id"
										name="id"
										value={formData.id}
										onChange={handleChange}
										className="border rounded px-2 py-1 w-3/4 float-right bg-[white] focus:outline-none focus:border-[#6096B4]"
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
										className="border rounded px-2 py-1 w-3/4 float-right bg-[white] focus:outline-none focus:border-[#6096B4]"
									/>
								</div>

								<div className="mb-4 bg-[white]">
									<label htmlFor="id" className="text-right w-1/4 text-[#6096B4]">
										ImageURL:
									</label>
									<input
										type="text"
										id="imageSrc"
										name="imageSrc"
										value={formData.imageSrc}
										onChange={handleChange}
										className="border rounded px-2 py-1 w-3/4 float-right bg-[white] focus:outline-none focus:border-[#6096B4]"
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
										className="border rounded px-2 py-1 w-3/4 float-right h-32 bg-[white] focus:outline-none focus:border-[#6096B4]"
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
						<div className="container mx-auto"><button className="bg-transparent hover:bg-[#6096B4] text-[#6096B4] font-semibold hover:text-white py-2 px-4 border border-[#6096B4] hover:border-transparent rounded mb-16" onClick={onClickShowModal}>Add Product</button></div>

					</div>
				</div>
				<div>
					{showAddedToast ? <Toast message="Item is successfully added" level="Success" onClose={() => { setAddedToast(false) }} /> : <></>}
					{showCancelToast ? <Toast message="Cancelled" level="Warning" onClose={() => { setCancelToast(false) }} /> : <></>}

				</div>
				<div >
					<div>
						<Modal isOpen={showUpdateModal} onClose={() => { setShowUpdateModal(false); resetFormData() }} >
							<div className="flex flex-col h-full bg-[white] pd-30">
								<div className="mb-4 bg-[white]">
									<label htmlFor="id" className="text-right w-1/4 text-[#6096B4]">
										ID:
									</label>
									<input
										readOnly
										type="number"
										id="id"
										name="id"
										placeholder={String(curId)}
										onChange={handleChange}
										className="border rounded px-2 py-1 w-3/4 float-right bg-[white] focus:outline-none focus:border-[#6096B4]"
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
										placeholder={curName}
										value={formData.name}
										onChange={handleChange}
										className="border rounded px-2 py-1 w-3/4 float-right bg-[white] text-[#6096B4] focus:outline-none focus:border-[#6096B4]"
									/>
								</div>

								<div className="mb-4 bg-[white]">
									<label htmlFor="id" className="text-right w-1/4 text-[#6096B4]">
										ImageURL:
									</label>
									<input
										type="text"
										id="imageSrc"
										name="imageSrc"
										placeholder={curUrl}
										value={formData.imageSrc}
										onChange={handleChange}
										className="border rounded px-2 py-1 w-3/4 float-right bg-[white] text-[#6096B4] focus:outline-none focus:border-[#6096B4]"
									/>
								</div>

								<div className="mb-4">
									<label htmlFor="description" className="text-right w-1/4 text-[#6096B4]">
										Description:
									</label>
									<textarea

										id="description"
										name="description"
										placeholder={curDescription}
										value={formData.description}
										onChange={handleChange}
										className="border rounded px-2 py-1 w-3/4 float-right h-32 bg-[white] text-[#6096B4] focus:outline-none focus:border-[#6096B4]"
									/>
								</div>
								<div className="mt-auto flex justify-end flex space-x-2">
									<button className="bg-transparent hover:bg-[#6096B4] text-[#6096B4] font-semibold hover:text-white py-2 px-4 border border-[#6096B4] hover:border-transparent rounded" onClick={handleCancelUpdate}>
										Cancel
									</button>
									<button className="bg-transparent hover:bg-[#6096B4] text-[#6096B4] font-semibold hover:text-white py-2 px-4 border border-[#6096B4] hover:border-transparent rounded" onClick={handleUpdateProduct}>
										Update
									</button>
								</div>
							</div>
						</Modal>
					</div>

					<div className="grid grid-cols-3 gap-10 place-content-center">
						{products.map((product) => (
							<div key={product.id}>


								<Card
									imageSrc={product.imageSrc}
									name={product.name}
									description={product.description}
									handleUpdate={() => { setShowUpdateModal(true); setCurID(product.id); setCurName(product.name); setCurUrl(product.imageSrc); setCurDescription(product.description) }}
									handleRemove={() => { handleRemoveProduct(product.id) }}

								/>




							</div>
						))}
					</div>
					{showRemoveToast ? <Toast message="Item is successfully removed" level="Error" onClose={() => { setRemoveToast(false) }} /> : <></>}
					{showUpdateToast ? <Toast message="Item is successfully updated" level="Info" onClose={() => { setUpdateToast(false) }} /> : <></>}
				</div>
			</div>
		</main>
	)
}