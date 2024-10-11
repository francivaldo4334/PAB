const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cheerio = require('cheerio')

// Diretórios
const srcDir = path.join(__dirname, 'src');
const buildDir = path.join(__dirname, 'build');

// Função para copiar estilos e transpilar TypeScript
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

// Função para processar HTML
async function processHTML() {
    const htmlPath = path.join(srcDir, 'index.html');
    let htmlContent = await fs.promises.readFile(htmlPath, 'utf8');

    // Carrega o conteúdo HTML com Cheerio
    const $ = cheerio.load(htmlContent);

    // Substitui as tags <comp>
    const components = $('comp');
    for (let i = 0; i < components.length; i++) {
        const comp = $(components[i]);
        const src = comp.attr('src');

        if (src) {
            const componentPath = path.join(srcDir, src);
            const componentContent = await fs.promises.readFile(componentPath, 'utf8');
            
            // Cria um novo elemento usando o conteúdo do componente
            const newElement = $(componentContent);

            // Copia todos os atributos, exceto o src
            comp.each((_, el) => {
                const attributes = el.attributes;
                for (let j = 0; j < attributes.length; j++) {
                    const attrName = attributes[j].name;
                    if (attrName !== 'src') {
                        newElement.attr(attrName, attributes[j].value);
                    }
                }
            });

            // Substitui a tag <comp> pelo novo conteúdo
            comp.replaceWith(newElement);
        }
    }

    // Salva o HTML modificado
    await fs.promises.writeFile(path.join(buildDir, 'index.html'), $.html());}

// Função principal
async function main() {
    try {
        // Limpa a pasta build
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

