const puppeteer = require('puppeteer');

const pages = [
    'attendance.html',
    'check-in.html',
    'check-out.html',
    'communication.html',
    'daily-reports.html'
];

(async () => {

const browser = await puppeteer.launch();

const pdf = await browser.newPage();

let html = "";

for(const page of pages){

    const p = await browser.newPage();

    await p.goto("http://localhost/guide/" + page);

    html += await p.$eval("body", e => e.innerHTML);

    await p.close();

}

await pdf.setContent(html);

await pdf.pdf({
    path:'Company-Guide.pdf',
    format:'A4',
    printBackground:true
});

await browser.close();

})();