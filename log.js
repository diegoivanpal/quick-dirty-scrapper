export const log = (...args) => console.log('[dirty-scrapper]', ...args)
export const time = (string = '' )=> 
{
    console.time(`[dirty-scrapper] ${string}`)
    return () => console.timeEnd(`[dirty-scrapper] ${string}`)
}