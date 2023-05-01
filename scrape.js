const puppeteer = require('puppeteer');

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
      product.name = element.querySelector('.list_info a').innerText;
      product.price = element.querySelector('.price').innerText;
      
      productList.push(product);
    }

    return productList;
  }).catch((error) => {
    console.error(error);
  });

  console.log(products);

  await browser.close();
}

scrapeTopSellingProducts();
