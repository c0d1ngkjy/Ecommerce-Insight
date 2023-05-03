import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import puppeteer from 'puppeteer';

const firebaseConfig = {
  apiKey: "AIzaSyCwXgJ-LoLrPy4W-TpDXNmfLuTfQYvcARE",
  authDomain: "ecommerce-insights-kr.firebaseapp.com",
  projectId: "ecommerce-insights-kr",
  storageBucket: "ecommerce-insights-kr.appspot.com",
  messagingSenderId: "803720686457",
  appId: "1:803720686457:web:cfd27d019c533bb75a9da8",
  measurementId: "G-CK1KMRPK6D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function scrapeTopSellingProducts() {
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  await page.goto("https://www.musinsa.com/ranking/best");

  // Wait for the page to fully load
  await page.waitForSelector('.li_box');

  // Get the top selling products on the page
  const products = await page.evaluate(() => {
    const productList = [];
    const productElements = document.querySelectorAll('.li_box');

    for (const element of productElements) {
      const product = {};
      product.name = element.querySelector('.list_info a').innerText.replace(/\[(.*?)\]/g, ''); // Remove [] and their contents
      product.price = element.querySelector('.price').innerText.replace(/[^\d\n]/g, ''); // Remove non-digit characters except '\n'
      
      if (product.price.includes('\n')) { // If there are two prices separated by '\n', take the second one
        product.price = product.price.split('\n')[1];
      }

      productList.push(product);
    }

    return productList;
  }).catch((error) => {
    console.error(error);
  });

  console.log(products);

  // Save the scraped data to Firestore
  const collectionRef = collection(db, 'products');
  
  products.forEach(async (product) => {
    const docRef = doc(collectionRef);
    await setDoc(docRef, product);
  });

  await browser.close();
}

scrapeTopSellingProducts();
