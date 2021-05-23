
const drivers = {
    chrome: { version: '88.0.4324.96' }, // https://chromedriver.chromium.org/
}
const {ReportAggregator, HtmlReporter} = require('@rpii/wdio-html-reporter');
const log4j = require('@log4js-node/log4js-api');
const logger = log4j.getLogger('default');

exports.config={

    reporters: [[
  "spec",
  {
    symbols: {
    passed: '[PASS]',
      failed: '[FAIL]',

    },
  },
],

    [HtmlReporter, {
        debug: true,
        outputDir: './reports/html-reports/',
        filename: 'report.html',
        reportTitle: 'Test Report Title',
        
        //to show the report in a browser when done
        showInBrowser: true,

        //to turn on screenshots after every test
        useOnAfterCommandForScreenshot: false,

        // to use the template override option, can point to your own file in the test project:
        // templateFilename: path.resolve(__dirname, '../template/wdio-html-reporter-alt-template.hbs'),
        
        // to add custom template functions for your custom template:
        // templateFuncs: {
        //     addOne: (v) => {
        //         return v+1;
        //     },
        // },

        //to initialize the logger
       LOG: log4j.getLogger("default")
    }
    ]
],


    // runner:'local',    
    specs: [
        './test/**/*.ts'
    ],
    capabilities: [{
        browserName: 'chrome', 
        maxInstances: 1,       
    }],    
    framework: 'mocha',  
   
    services: [
        ['selenium-standalone', {
            logPath: 'logs',
            installArgs: { drivers }, // drivers to install
            args: { drivers } // drivers to use
        }]
    ],
 
       logLevel: 'error',
    autoCompileOpts: {
        autoCompile: true, 
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json'            
        }
    },

    
    onPrepare: function (config, capabilities) {

        let reportAggregator = new ReportAggregator({
            outputDir: './reports/html-reports/',
            filename: 'master-report.html',
            reportTitle: 'Master Report',
            browserName : capabilities.browserName,
            collapseTests: true,
            // to use the template override option, can point to your own file in the test project:
            // templateFilename: path.resolve(__dirname, '../template/wdio-html-reporter-alt-template.hbs')
        });
        reportAggregator.clean() ;

        global.reportAggregator = reportAggregator;
    },
    
    onComplete: function(exitCode, config, capabilities, results) {
        (async () => {
            await global.reportAggregator.createReport();
        })();
    },
    
}