#! /usr/bin/env node
var { program } = require("commander");
var { exec } = require("child_process");
var { renameSync, rmdirSync, unlinkSync } = require("fs");
var { dirname, basename, join } = require("path");
var fs = require("fs");
var ts = require("typescript");
var compileConfig = require("./apiCompilerConfig.json");

program
    .option("-i, --input <input>", "Input YAML schema file path")
    .option(
        "-o, --output <output>",
        "Output path including the filename (e.g., /output/api.js)"
    )
    .option("-c, --config <config>", "Config file path (e.g., /config.json)")
    .parse(process.argv);

const compileApi = (tsPath, outputPath) => {
    // read ts file
    const tsFile = fs.readFileSync(tsPath, "utf8");
    const result = ts.transpile(tsFile, compileConfig);
    // write the result to output file
    fs.writeFileSync(outputPath, result);
    console.log("wrote output to " + outputPath);
};

// Function to run a command and handle success or failure
function runCommand(command, successMessage, failureMessage) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(failureMessage);
                console.error(stderr);
                reject(error);
            } else {
                console.log(successMessage);
                resolve();
            }
        });
    });
}

async function generateAPI(inputFilePath, outputFilePath, config) {
    try {
        // Convert YAML schema to JSON schema
        const yamlToJSONCommand = `redocly bundle ${inputFilePath} -o ./openapi.json --ext json`;
        await runCommand(
            yamlToJSONCommand,
            "JSON bundle generation successful",
            "JSON bundle generation failed"
        );

        // Run OpenAPI generator
        const openApiGeneratorCommand = `npx @rtk-query/codegen-openapi ${config}`;
        await runCommand(
            openApiGeneratorCommand,
            "OpenAPI generation successful",
            "OpenAPI generation failed"
        );

        // Run TypeScript compilation
        compileApi("./api.ts", outputFilePath);

        console.log("Removing Build Artifacts");
        unlinkSync("./openapi.json");
        unlinkSync("./api.ts");

        console.log("API generation successful");
        process.exit(0);
    } catch (error) {
        console.error("API generation failed", error);
        process.exit(1);
    }
}

const { input, output, config } = program.opts();

if (!input || !output || !config) {
    console.error("Please provide input, output, and config paths");
    process.exit(1);
}

generateAPI(input, output, config);
