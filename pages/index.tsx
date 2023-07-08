import { useProductStore } from "../store/store"
import React, { useEffect, useState } from 'react';
import styles from "../styles/Home.module.css";
import Toast from "@/components/toast";
import Card from "@/components/card"
import Modal from "@/components/modal"
import LoadingSpinner from "@/components/loadingSpinner"


export default function Home() {

  const [showToast, setShowToast] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const onClickShowToast = () => {
    setShowToast(true);
  };

  const onClickShowModal = () => {
    setShowModal(true);
  };

  return (
    <main className="main">
      <h1 className="text-3xl font-bold underline">
          Hello world!
      </h1>
  
    </main>
  )
}
