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
  await page.goto("https://www.musinsa.com/categories/item/001002?d_cat_cd=001002&brand=&list_kind=small&sort=sale_high&sub_sort=3m&page=1&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color=&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure=");

  // Wait for the page to fully load
  await page.waitForSelector('.li_box');

  // Get the top selling products on the page
  const products = await page.evaluate(() => {
    const productList = [];
    const productElements = document.querySelectorAll('.li_box');

    for (const element of productElements) {
      const product = {};
      product.name = element.querySelector('.list_info a').innerText.replace(/\[(.*?)\]/g, ''); // Remove [] and their contents
      product.price = element.querySelector('.price').innerText;
      const prices = product.price.split(' ');
      if (prices.length >= 2) {
        product.price = prices[1].replace('원', '');
        product.price.replace(',', '');
      } else {
        product.price = prices[0].replace('원', '');
        product.price.replace(',', '');

      }

      
      productList.push(product);
    }

    return productList;
  }).catch((error) => {
    console.error(error);
  });

  console.log(products);

  //Save the scraped data to Firestore
  const collectionRef = collection(db, 'shirt&&blouse');
  
  products.forEach(async (product) => {
    const docRef = doc(collectionRef);
    await setDoc(docRef, product);
  });

  await browser.close();
}

scrapeTopSellingProducts();
