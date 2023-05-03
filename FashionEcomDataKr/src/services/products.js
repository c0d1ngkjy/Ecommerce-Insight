import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from "boot/firebase";

export const getProducts = async () => {
  const products = [];

  const productsSnapshot = await getDocs(collection(db, 'products'));
  productsSnapshot.forEach((doc) => {
    products.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return products;
};
