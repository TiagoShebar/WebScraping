import { chromium } from "playwright";

const browser = await chromium.launch(
    { headless: true}
)

const page = await browser.newPage();

await page.goto(
    'https://www.amazon.com/s?k=playstation+5&crid=3GUC4XEUMGOQV&sprefix=plays%2Caps%2C234&ref=nb_sb_ss_pltr-xclick_1_5'
)

const products = await page.$$eval(
    '.s-card-container',
    (results) => (
        results.map((el) => {
            const title = el
                .querySelector('h2')
                ?.innerText

            if(!title) return null

            const image = el
                .querySelector('img')
                .getAttribute('src')

            const price = el
                .querySelector('.a-price .a-offscreen')
                ?.innerText;

            const link = el
                .querySelector('.a-link-normal')
                .getAttribute('href')

            return { title, image, price, link }
             
        }
        )
    )
)

console.log(products)
await browser.close()