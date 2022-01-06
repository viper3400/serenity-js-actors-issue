"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const console_reporter_1 = require("@serenity-js/console-reporter");
const core_1 = require("@serenity-js/core");
const serenity_bdd_1 = require("@serenity-js/serenity-bdd");
const web_1 = require("@serenity-js/web");
const path_1 = require("path");
const src_1 = require("./src");
exports.config = {
    baseUrl: 'https://todo-app.serenity-js.org/',
    framework: '@serenity-js/webdriverio',
    serenity: {
        actors: new src_1.Actors(),
        crew: [
            core_1.ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
            web_1.Photographer.whoWill(web_1.TakePhotosOfFailures),
            // Photographer.whoWill(TakePhotosOfInteractions),
            console_reporter_1.ConsoleReporter.forDarkTerminals(),
            new serenity_bdd_1.SerenityBDDReporter(),
        ]
    },
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
    specs: [
        './spec/**/*.spec.ts',
    ],
    // reporters: [
    //     'spec',
    // ],
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: (0, path_1.resolve)(__dirname, './tsconfig.json'),
        },
    },
    // headless: true,
    automationProtocol: 'devtools',
    runner: 'local',
    maxInstances: 1,
    capabilities: [{
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    // '--headless',
                    '--disable-web-security',
                    '--allow-file-access-from-files',
                    '--allow-file-access',
                    '--disable-infobars',
                    '--ignore-certificate-errors',
                    '--disable-gpu',
                    '--disable-gpu',
                    '--window-size=1024x768',
                ],
            }
        }],
    logLevel: 'info',
    // logLevel: 'debug',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
};
//# sourceMappingURL=wdio.conf.js.map