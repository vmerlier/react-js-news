export function getNews() {
    return JSON.parse( localStorage.getItem( "TabNews" ) )
}

export function addNews( film ) {
    var tab = getNews() || []
    tab.push( film )
    localStorage.setItem( "TabNews", JSON.stringify( tab ) )
}