const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cheerio = require('cheerio')
const srcDir = path.join(__dirname, 'src');
const buildDir = path.join(__dirname, 'build');

async function copyStyles() {
    try {
        const files = await fs.promises.readdir(srcDir);
        const cssFiles = files.filter(file => path.extname(file) === '.css');
        await Promise.all(cssFiles.map(file => 
            fs.promises.copyFile(
                path.join(srcDir, file), 
                path.join(buildDir, file)
            )
        ));
        console.log('Todos os arquivos CSS foram copiados com sucesso!');
    } catch (error) {
        console.error('Erro ao copiar os arquivos CSS:', error);
    }
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

async function replaceAttributes(element, newElement) {
    element.each((_, el) => {
        const attributes = el.attributes;
        for (let attribute of attributes){
            const subelements = newElement.find(attribute.name)
            if (subelements.length > 0) {
                subelements.replaceWith(attribute.value);
            }
            else if (attribute.name !== "src") {
                newElement.attr(attribute.name, attribute.value);
            } 
        };
    });
}

async function replaceElement(element, newElement, $) {

    await replaceAttributes(element, newElement);
    const contentNewElement = newElement.find("content").first();
    if (contentNewElement.length > 0) {
        contentNewElement.replaceWith(element.html());
    }
    element.replaceWith(newElement);
};

async function processComponet(comp, $) {
    const src = comp.attr('src');
    if (src) {
        const componentPath = path.join(srcDir, src);
        const componentContent = await fs.promises.readFile(componentPath, 'utf8');
        const newElement = $(componentContent);
        await replaceElement(comp, newElement, $);
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

