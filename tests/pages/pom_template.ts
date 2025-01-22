

export default interface PomTemplate {

    searchAnItem(item:string):Promise<void>
    waitToOpenInNewTab():Promise<void>
    buyItNow():Promise<void>
    enterShippingAddressAndSubmit({}):Promise<void>

}