import path from 'path'
const fs = require("fs")

export class Merger {
    constructor() {
        this.footer = ` 
        ENDSEC;
        
        END-ISO-10303-21;`
    }

    merge(files, directory) {
        const resultFilePath = path.join(directory, 'result.ifc') // set file path
        fs.writeFileSync(resultFilePath, this.getHeading()) // write heding
        for (let i = 0; i < files.length; i++) {
            let contents = fs.readFileSync(files[i], "utf8");
            let start = contents.search(/ENDSEC;/i) + 7;
            let startIndex = contents.indexOf("DATA;", start) + 7;
            let endIndex = contents.indexOf("ENDSEC;", start) - 1;
            let data = contents.slice(startIndex, endIndex);
            let changed = data.replace(/#/g, `#${i + 1}`);
            fs.appendFileSync(resultFilePath, changed + '\n') // append changed data
        }
        fs.appendFileSync(resultFilePath, this.footer) // append footer
    }

    getHeading() {
        return `
        ISO-10303-21;
        HEADER;
        
        /******************************************************************************************
        * STEP Physical File produced by: The EXPRESS Data Manager Version 5.02.0100.07 : 28 Aug 2013
        * Module:                         EDMstepFileFactory/EDMstandAlone
        * Creation date:                  ${this.getDate()}
        * Host:                           ASK-W41
        * Database:                       C:\Users\STANIS~1\AppData\Local\Temp\{6BC90897-ED32-4644-9F0A-BF59F4E0034D}\ifc
        * Database version:               5507
        * Database creation date:         ${this.getDate()}
        * Schema:                         IFC2X3
        * Model:                          DataRepository.ifc
        * Model creation date:            ${this.getDate()}
        * Header model:                   DataRepository.ifc_HeaderModel
        * Header model creation date:     ${this.getDate()}
        * EDMuser:                        sdai-user
        * EDMgroup:                       sdai-group
        * License ID and type:            5605 : Permanent license. Expiry date: 
        * EDMstepFileFactory options:     020000
        ******************************************************************************************/
        FILE_DESCRIPTION(('ViewDefinition [CoordinationView_V2.0]'),'2;1');
        FILE_NAME('43466','2020-06-08T19:52:37',(''),(''),'The EXPRESS Data Manager Version 5.02.0100.07 : 28 Aug 2013','20190808_0900(x64) - Exporter 19.3.0.0 - Alternate UI 19.3.0.0','');
        FILE_SCHEMA(('IFC2X3'));
        ENDSEC; 
        
        DATA;
        `
    }

    getDate() {
        const now = new Date()
        const year = now.getFullYear()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()
        const date = now.getDate()
        const month = this.getMonth()
        const day = this.getDay()
        return `${day} ${month} ${date} ${hours}:${minutes}:${seconds} ${year}`
    }

    getMonth() {
        const now = new Date()
        const month = now.getMonth()
        const verbose = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return verbose[month]
    }

    getDay() {
        const now = new Date()
        const day = now.getDay()
        const verbose = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return verbose[day]
    }
}