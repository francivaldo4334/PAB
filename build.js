const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cheerio = require('cheerio')
const srcDir = path.join(__dirname, 'src');
const buildDir = path.join(__dirname, 'build');

async function copyStyles() {
    await fs.promises.copyFile(path.join(srcDir, 'styles.css'), path.join(buildDir, 'styles.css'));
}

async function transpileTS() {
    return new Promise((resolve, reject) => {
        exec('npx tsc', (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro na transpilação: ${stderr}`);
                return reject(error);
            }
            console.log(`Transpilação concluída:\n${stdout}`);
            resolve();
        });
    });
}

async function processComponet(comp, $) {
    const src = comp.attr('src');
    if (src) {
        const componentPath = path.join(srcDir, src);
        const componentContent = await fs.promises.readFile(componentPath, 'utf8');
        const newElement = $(componentContent);
        comp.each((_, el) => {
            const attributes = el.attributes;
            attributes.forEach(attribute => {
                if (attribute.name !== "src") {
                    newElement.attr(attribute.name, attribute.value);
                } 
            });
        });
        if (comp.html()) {
            newElement.html(comp.html())
        }
        comp.replaceWith(newElement);
    }

};

async function processHTML() {
    const htmlPath = path.join(srcDir, 'index.html');
    let htmlContent = await fs.promises.readFile(htmlPath, 'utf8');
    const $ = cheerio.load(htmlContent);
    let components = $('comp');
    while(components.length !== 0) {
        for (const component of components.toArray()) {
            const comp = $(component);
            await processComponet(comp, $);
        }
        components = $('comp');
    }
    await fs.promises.writeFile(path.join(buildDir, 'index.html'), $.html());
}

async function main() {
    try {
        await fs.promises.rm(buildDir, { recursive: true, force: true });
        await fs.promises.mkdir(buildDir);
        await copyStyles();
        await processHTML();
        await transpileTS();
    } catch (error) {
        console.error('Erro durante o processo de build:', error);
    }
}

main();

