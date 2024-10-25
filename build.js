const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const cheerio = require("cheerio");
const srcDir = path.join(__dirname, "src");
const buildDir = path.join(__dirname, "docs");

async function copyFiles(srcDir, buildDir, extension) {
	try {
		const files = await fs.promises.readdir(srcDir);
		await Promise.all(
			files.map(async (file) => {
				const srcFilePath = path.join(srcDir, file);
				const stat = await fs.promises.stat(srcFilePath);
				if (stat.isDirectory()) {
					const newBuildDir = path.join(buildDir, file);
					await fs.promises.mkdir(newBuildDir, { recursive: true });
					await copyFiles(srcFilePath, newBuildDir, extension); // Reuse copyFiles for nested directories
				} else if (path.extname(file) === extension) {
					const destFilePath = path.join(buildDir, file);
					console.log(`Copying: ${srcFilePath} to ${destFilePath}`);
					await fs.promises.mkdir(buildDir, { recursive: true });
					await fs.promises.copyFile(srcFilePath, destFilePath);
				}
			}),
		);
		console.log(`All ${extension} files copied successfully!`);
	} catch (error) {
		console.error(`Error copying ${extension} files:`, error);
	}
}

async function copyStyles(srcDir, buildDir) {
	await copyFiles(srcDir, buildDir, ".css");
}

async function copySvgs(srcDir, buildDir) {
	await copyFiles(srcDir, buildDir, ".svg");
}

async function transpileTS() {
	return new Promise((resolve, reject) => {
		exec("npm run webpack", (error, stdout, stderr) => {
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
		for (let attribute of attributes) {
			const subelements = newElement.find(attribute.name);
			if (subelements.length > 0) {
				subelements.replaceWith(attribute.value);
			} else if (attribute.name !== "src") {
				newElement.attr(attribute.name, attribute.value);
			}
		}
	});
}

async function replaceElement(element, newElement, $) {
	await replaceAttributes(element, newElement);
	const contentNewElement = newElement.find("content").first();
	if (contentNewElement.length > 0) {
		contentNewElement.replaceWith(element.html());
	}
	element.replaceWith(newElement);
}

async function processComponet(comp, $) {
	const src = comp.attr("src");
	if (src) {
		const componentPath = path.join(srcDir, src);
		const componentContent = await fs.promises.readFile(componentPath, "utf8");
		const newElement = $(componentContent);
		await replaceElement(comp, newElement, $);
	}
}

async function processHTML() {
	const htmlPath = path.join(srcDir, "index.html");
	let htmlContent = await fs.promises.readFile(htmlPath, "utf8");
	const $ = cheerio.load(htmlContent);
	let components = $("comp");
	while (components.length !== 0) {
		for (const component of components.toArray()) {
			const comp = $(component);
			await processComponet(comp, $);
		}
		components = $("comp");
	}
	let includes = $("[include]");
	while (includes.length !== 0) {
		for (const includeEl of includes.toArray()) {
			const el = $(includeEl);
			const parent = el.parent();
			const attrInclude = el.attr("include")
			const attr = parent.attr(attrInclude)
			if (attr) {
				el.attr(attrInclude, attr)
			}
			parent.removeAttr(el.attr("include"))
			el.removeAttr("include")
		}
		includes = $("[include]")
	}
	await fs.promises.writeFile(path.join(buildDir, "index.html"), $.html());
}

async function main() {
	try {
		await fs.promises.rm(buildDir, { recursive: true, force: true });
		await fs.promises.mkdir(buildDir);
		await processHTML();
		await transpileTS();
		await copyStyles(srcDir, buildDir);
		await copySvgs(srcDir, buildDir);
	} catch (error) {
		console.error("Erro durante o processo de build:", error);
	}
}

main();
